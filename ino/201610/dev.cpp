#include <SoftwareSerial.h>
#include <EEPROM.h>
#include "Tlc5940.h"
#define	DATA_COMMAND	0X40
#define	DISP_COMMAND	0x80
#define	ADDR_COMMAND	0XC0
SoftwareSerial mySerial(7, 8); // RX, TX
unsigned int totalnum=72;
int STB=4;  //strobe
int CLK=5;  //clock
int DIO=6;  //data
int fanspeed=A0;
int tempsensor=A1;


/* 發模光式的參數 - 7線 */
// 128(%亮度)  * 32(最大參數) = 4096
// 0 ~ 128 -> 100% ~ 0%
// 
unsigned char five[7]={27,27,52,11,11,16,16};//4096/30x20/100
unsigned char ten[7]={25,20,27,12,12,16,16};
unsigned char fifteen[7]={27,10,30,15,15,19,19};
unsigned char twenty[7]={27,0,35,15,15,22,22};
unsigned char highcolor[7]={23,40,26,11,11,15,15};
unsigned char blue[7]={0,0,40,40,40,40,40};


/**/
unsigned char temp[13]; //read temp
unsigned char i; // temp index

unsigned char seg[]={0x3F,0x06,0x5B,0x4F,0x66,0x6D,0x7D,0x07,0x7F,0x6F};

unsigned int datacode[72][3];//[section][starttime、mode、multiple]
unsigned char SEC;

unsigned int nowmin,phonetime=0;
unsigned char out1,out2,out3,out4,out5,out6;
unsigned char key;
//
unsigned long long firstMachineMin = 0;
bool isManual = false;
unsigned int manualDatacode[2]={0};//[mode、multiple]


void setup() {
  Tlc.init();

  /* EEPROM 讀取資料 */
  out1 = EEPROM.read(1);
  out2 = EEPROM.read(2);
  out3 = EEPROM.read(3);
  out4 = EEPROM.read(4);
  out5 = EEPROM.read(5);
  out6 = EEPROM.read(6);
  /**/
  i = 0;
  Serial.begin(9600);
  Serial.println("Gogogo!");
  mySerial.begin(9600);

  pinMode(tempsensor, INPUT); //溫度感應器
  pinMode(fanspeed, INPUT); //風速感應器

  /* LED數字顯示 */
  pinMode(STB, OUTPUT);
  pinMode(CLK, OUTPUT);
  pinMode(DIO, OUTPUT);
  init_TM1638();

  delay(500);
  //analogWrite(fanspeed,0);
  //Tlc.clear();

  /* 燈泡亮度0 */
  for (char b = 0; b < 7; b++) Tlc.set(b, 4095);
  Tlc.update();

  Write_DATA(0, seg[8]);
  Write_DATA(2, seg[9]);
}

void loop() // run over and over
{
  nowmin = (millis() / 60000) + phonetime;
  if (analogRead(tempsensor) < 570 || analogRead(fanspeed) < 30) //(analogRead(fanspeed)>=400)
  {
    for (char b = 0; b < 14; b++) Tlc.set(b, 4095);
    Tlc.update();

    Write_DATA(0, seg[9]);
    Write_DATA(2, seg[9]);
  } else {

    if (mySerial.available()) {

      Write_DATA(0, seg[9]);
      Write_DATA(2, seg[8]);
      /*接受藍芽指令*/
      temp[i] = mySerial.read();
      if (temp[i] == 90) {
        for (char k = 0; k < 8; k++) {

          if (temp[k] == 65 && i>=9) {
            /*
            RX Data form
            k +1  +2      +3      +4     +5   +6       +7       +8
            A+Mode+Section+SetHour+SetMin+Mode+multiple+phonehour+phonemin+Z
        
            datacode[section][starttime、mode、multiple]
            */
            SEC=temp[k+1]*24+temp[k+2];//Section = mode0~2*24+SEC0~23
            datacode[SEC][0]=temp[k+3]*60+temp[4];//starttime=Sethour*60+Settmin
            datacode[SEC][1]=temp[k+5];//Mode: Mode0->5M ,Mode1->10M ,Mode2->15M ,Mode3->20M ,Mode4->highcolor,Mode5->blue
            datacode[SEC][2]=temp[k+6];//multiple
            firstMachineMin = millis();
            phonetime=temp[k+7]*60+temp[k+8];
            Serial.println("Init firstMachineMin=" + firstMachineMin);
          }
        }

        Serial.print("starttime=");
        Serial.print(datacode[SEC][0]);
        Serial.print(",");
        Serial.print("Mode=");
        Serial.print(datacode[SEC][1]);
        Serial.print(",");
        Serial.print("mul=");
        Serial.print(datacode[SEC][2]);
        Serial.print(",");
        Serial.print("phonetime=");
        Serial.print(phonetime);
        Serial.println();
      } else if(temp[i]==255){
        /* Manual Mode temp = [250,Mode,multiple,255]  開啟
                       temp = [240,0,0,255]  關閉
        */
            if (i >= 3)
            {
              Serial.println("###################");
              for(int j=0;j<=i;j++){
                
                Serial.println(temp[j]);
                }
              Serial.println("###################");
              if(temp[i-3]==250){   
              //ex.  250  0    100  255
              //     i-3  i-2  i-1  i
                isManual = true;
                manualDatacode[0]=temp[i-2];  //Mode
                manualDatacode[1]=temp[i-1];  //multiple
                Serial.println("Enabled Manual");
                /**/
                if(manualDatacode[0]==0) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*five[b]);}
                if(manualDatacode[0]==1) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*ten[b]);}
                if(manualDatacode[0]==2) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*fifteen[b]);}
                if(manualDatacode[0]==3) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*twenty[b]);}
                if(manualDatacode[0]==4) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*highcolor[b]);}
                if(manualDatacode[0]==5) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*blue[b]);}
                Tlc.set(7, 0);
                Tlc.update();
                /**/
                i=-1;
              }else if(temp[i-3]==240){
                isManual = false;
                manualDatacode[0]=temp[i-2];  //Mode
                manualDatacode[1]=temp[i-1];  //multiple
                Serial.println("Disabled Manual");
                for(char b=0;b<14;b++)Tlc.set(b, 4095);
                  Tlc.set(7, 0);
                Tlc.update(); 
                
                i=-1;
              }
            }else if(i >= 14){
              /* DEV CMD:
                 240,0,1,2,3,4,5,6,7,8,9,10,11,12,255
                 0 ... ...                        14
              */
              isManual = true;
              int devMultiple = temp[i-1];
              for(char b=0;b<12;b++)
                Tlc.set(b, 4095- temp[i-13+b]*devMultiple);
              Tlc.update();
              i=-1; 
            }else{}; //END else :if (i >= 3);

        }else {};//END else :if(temp[i] == 90);

      if(i>15||i<0){i=0;}else{i++;}
    }else{} /* 結束ifelse (mySerial.available()) */
    
    /*只要接收到手機的指令，就無法透過按鈕更改模式與亮度*/
    if (firstMachineMin!=0 && !isManual) {
      Write_DATA(0, seg[9]);
      Write_DATA(2, seg[7]);

      Serial.print("!!Automation Mode!!nowtime=");
      Serial.println(nowmin);
      
      int tempmai = 1;
      for (char y = 0; y < totalnum; y++) {
        if (nowmin >= datacode[y][0]) tempmax = max(tempmax, datacode[y][0]);
        //find the next setting to change and get the tempmax
        //datacode[section][starttime、mode、multiple]
      }
      for (char y = 0; y < totalnum; y++) {
        //find the all data
        if (tempmax == datacode[y][0]) {
          //datacode[section][starttime、mode、multiple]
          if (datacode[y][1] == 0) {
            for (char b = 0; b < 7; b++) Tlc.set(b, 4095 - datacode[y][2] * five[b]);
          }
          if (datacode[y][1] == 1) {
            for (char b = 0; b < 7; b++) Tlc.set(b, 4095 - datacode[y][2] * ten[b]);
          }
          if (datacode[y][1] == 2) {
            for (char b = 0; b < 7; b++) Tlc.set(b, 4095 - datacode[y][2] * fifteen[b]);
          }
          if (datacode[y][1] == 3) {
            for (char b = 0; b < 7; b++) Tlc.set(b, 4095 - datacode[y][2] * twenty[b]);
          }
          if (datacode[y][1] == 4) {
            for (char b = 0; b < 7; b++) Tlc.set(b, 4095 - datacode[y][2] * highcolor[b]);
          }
          if (datacode[y][1] == 5) {
            for (char b = 0; b < 7; b++) Tlc.set(b, 4095 - datacode[y][2] * blue[b]);
          }
          Tlc.set(7, 0);
          Tlc.update();
          /*Serial.print("output setting!");
          Serial.print(datacode[y][0]);
          Serial.print(datacode[y][1]);
          Serial.println(datacode[y][2]);   */
        }
      }
    }else {
      key = Read_key();
      if (key == 2) {
        delay(200);
        if (out1 > 100) out1 = 0;
        else out1 = int(out1 + 3);
        Write_DATA(0, seg[out1 / 3 / 10]);
        Write_DATA(2, seg[out1 / 3 % 10]);
        EEPROM.write(1, out1);
        for (char b = 0; b < 14; b++) Tlc.set(b, 4095 - out1 * five[b]);
      }
      if (key == 6) {
        delay(200);
        if (out2 > 100) out2 = 0;
        else out2 = int(out2 + 3);
        Write_DATA(0, seg[out2 / 3 / 10]);
        Write_DATA(2, seg[out2 / 3 % 10]);
        EEPROM.write(2, out2);
        for (char b = 0; b < 14; b++) Tlc.set(b, 4095 - out2 * ten[b]);
      }
      if (key == 3) {
        delay(200);
        if (out3 > 100) out3 = 0;
        else out3 = int(out3 + 3);
        Write_DATA(0, seg[out3 / 3 / 10]);
        Write_DATA(2, seg[out3 / 3 % 10]);
        EEPROM.write(3, out3);
        for (char b = 0; b < 14; b++) Tlc.set(b, 4095 - out3 * fifteen[b]);
      }
      if (key == 7) {
        delay(200);
        if (out4 > 100) out4 = 0;
        else out4 = int(out4 + 3);
        Write_DATA(0, seg[out4 / 3 / 10]);
        Write_DATA(2, seg[out4 / 3 % 10]);
        EEPROM.write(4, out4);
        for (char b = 0; b < 14; b++) Tlc.set(b, 4095 - out4 * twenty[b]);
      }
      if (key == 4) {
        delay(200);
        if (out5 > 100) out5 = 0;
        else out5 = int(out5 + 3);
        Write_DATA(0, seg[out5 / 3 / 10]);
        Write_DATA(2, seg[out5 / 3 % 10]);
        EEPROM.write(5, out5);
        for (char b = 0; b < 14; b++) Tlc.set(b, 4095 - out5 * highcolor[b]);
      }
      if (key == 9) {
        delay(200);
        if (out6 > 100) out6 = 0;
        else out6 = int(out6 + 3);
        Write_DATA(0, seg[out6 / 3 / 10]);
        Write_DATA(2, seg[out6 / 3 % 10]);
        EEPROM.write(6, out6);
        for (char b = 0; b < 14; b++) Tlc.set(b, 4095 - out6 * blue[b]);
      }

      //Write_DATA(0,seg[analogRead(tempsensor)/10/10]);
      //Write_DATA(2,seg[analogRead(tempsensor)/10%10]);
      //delay(300);

      Tlc.set(15, 0); //0~4096
      Tlc.update();
    } /* 結束else :if(phonetime != 0) */
  } /* 結束else :if(analogRead(tempsensor) < 570 || analogRead(fanspeed) < 30)*/
}

void Write_DATA(unsigned char add, unsigned char DATA) {
  Write_COM(0x44);
  digitalWrite(STB, LOW);
  TM1638_Write(0xc0 | add);
  TM1638_Write(DATA);
  digitalWrite(STB, HIGH);
}

void TM1638_Write(unsigned char DATA) {
  unsigned char i;
  pinMode(DIO, OUTPUT);
  for (i = 0; i < 8; i++) {
    digitalWrite(CLK, LOW);
    if (DATA & 0X01)
      digitalWrite(DIO, HIGH);
    else
      digitalWrite(DIO, LOW);
    DATA >>= 1;
    digitalWrite(CLK, HIGH);
  }
}
unsigned char TM1638_Read(void) {
  unsigned char i;
  unsigned char temp = 0;
  pinMode(DIO, INPUT);
  for (i = 0; i < 8; i++) {
    temp >>= 1;
    digitalWrite(CLK, LOW);
    if (digitalRead(DIO) == HIGH)
      temp |= 0x80;
    digitalWrite(CLK, HIGH);

  }
  return temp;
}

void Write_COM(unsigned char cmd) {
  digitalWrite(STB, LOW);
  TM1638_Write(cmd);
  digitalWrite(STB, HIGH);
}

unsigned char Read_key(void) {
  unsigned char c[4], i, key_value = 0;
  digitalWrite(STB, LOW);
  TM1638_Write(0x42);
  for (i = 0; i < 4; i++) {
    c[i] = TM1638_Read();
  }
  digitalWrite(STB, HIGH);
  for (i = 0; i < 4; i++) {
    key_value |= c[i] << i;
  }
  for (i = 0; i < 8; i++) {
    if ((0x01 << i) == key_value)
      break;
  }
  return i;
}

void init_TM1638(void) {
  unsigned char i;
  Write_COM(0x8b); //亮度 (0x88-0x8f)
  Write_COM(0x40); //地址加1
  digitalWrite(STB, LOW);
  TM1638_Write(0xc0); //起始地址
  for (i = 0; i < 16; i++)
    TM1638_Write(0x00);
  digitalWrite(STB, HIGH);
}