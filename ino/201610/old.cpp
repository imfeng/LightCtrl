#include <SoftwareSerial.h>
#include "Tlc5940.h"
SoftwareSerial mySerial(7, 8); // RX, TX
unsigned int totalnum=72;
int sw6=2;
int sw5=4;
int sw4=5;
int sw3=6;
int sw1=A0;
int sw2=A1;
int fanspeed=A3;
//io set
unsigned char five[7]={27,27,25,11,11,16,16};//4096/30x20/100
unsigned char ten[7]={25,20,27,12,12,16,16};
unsigned char fifteen[7]={27,10,30,15,15,19,19};
unsigned char twenty[7]={27,0,35,15,15,22,22};
unsigned char highcolor[7]={23,40,26,11,11,15,15};
unsigned char blue[7]={0,0,40,40,40,40,40};

unsigned char temp[13]; //read temp
unsigned int datacode[72][3];//[section][starttime、mode、multiple]
unsigned char i,SEC;
unsigned int nowmin=0,phonetime=0;
char out1,out2,out3,out4,out5,out6,out7;

unsigned long long firstMachineMin = 0;
bool isManual = false;
unsigned int manualDatacode[2]={0};//[mode、multiple]

void setup()  
{
Tlc.init();
out1=0;
out2=0;
out3=0;
out4=0;
out5=0;
out6=0;
out7=0;
i=0;
Serial.begin(9600);
Serial.println("Gogogo!");
mySerial.begin(9600);
pinMode(sw1,INPUT);
pinMode(sw2,INPUT);
pinMode(sw3,INPUT);
pinMode(sw4,INPUT);
pinMode(sw5,INPUT);
pinMode(sw6,INPUT);
pinMode(fanspeed,INPUT);
digitalWrite(sw1,HIGH);
digitalWrite(sw2,HIGH);
digitalWrite(sw3,HIGH);
digitalWrite(sw4,HIGH);
digitalWrite(sw5,HIGH);
digitalWrite(sw6,HIGH);
//analogWrite(fanspeed,0);
//Tlc.clear();
for(char b=0;b<7;b++)Tlc.set(b, 4095);
}

void loop() // run over and over
{
  nowmin=((millis()- firstMachineMin)/60000) + phonetime;

  if(mySerial.available()){


    temp[i]=mySerial.read();

    Serial.println("");
    Serial.print("Received:");
    Serial.println(temp[i]);
    Serial.print("i=");
    Serial.println(i);

    if(temp[i]==90){
      for(char k=0;k<8;k++){

        if(temp[k]==65 && i>=9){
        Serial.println("=======================");
        for(int j=k;j<=i;j++){
          
          Serial.println(temp[j]);
          }
          Serial.println("=======================");
          Serial.print("auto Command Recieved");
          i=-1;
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
      //Serial.println();
    }else if(temp[i]==255){
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
            i=-1;
          }else if(temp[i-3]==240){
            isManual = false;
            manualDatacode[0]=temp[i-2];  //Mode
            manualDatacode[1]=temp[i-1];  //multiple
            Serial.println("Disabled Manual");
            for(char b=0;b<7;b++)Tlc.set(b, 4095);
            Tlc.set(7, 0);
            Tlc.update(); 
            i=-1;
          }
        }else{}

    }else {};

    if(i>12||i<0){i=0;}else{i++;}
  }/* if(mySerial.available()){ */
   
    if(firstMachineMin!=0 && !isManual) {
      Serial.print("!!Automation Mode!!nowtime=");
      Serial.println(nowmin);
      int tempmax=1;
      for(int y=0;y<totalnum;y++){
        if(nowmin>=datacode[y][0])tempmax=max(tempmax,datacode[y][0]);
        //find the next setting to change and get the tempmax
        //datacode[section][starttime、mode、multiple]
      }
      for(int y=0;y<totalnum;y++){
        //find the all data
        if(tempmax==datacode[y][0]){
          //datacode[section][starttime、mode、multiple]
          Serial.print("SEC=");Serial.println(y);
          if(datacode[y][1]==0) {for(char b=0;b<7;b++)Tlc.set(b, 4095-datacode[y][2]*five[b]);}
          if(datacode[y][1]==1) {for(char b=0;b<7;b++)Tlc.set(b, 4095-datacode[y][2]*ten[b]);}
          if(datacode[y][1]==2) {for(char b=0;b<7;b++)Tlc.set(b, 4095-datacode[y][2]*fifteen[b]);}
          if(datacode[y][1]==3) {for(char b=0;b<7;b++)Tlc.set(b, 4095-datacode[y][2]*twenty[b]);}
          if(datacode[y][1]==4) {for(char b=0;b<7;b++)Tlc.set(b, 4095-datacode[y][2]*highcolor[b]);}
          if(datacode[y][1]==5) {for(char b=0;b<7;b++)Tlc.set(b, 4095-datacode[y][2]*blue[b]);}
          Tlc.set(7, 0);
          Tlc.update(); 
        }
      }
    }else if(isManual){
        Serial.print("!!ManualMode!!");
        //find the all data
        //datacode[section][starttime、mode、multiple]
        if(manualDatacode[0]==0) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*five[b]);}
        if(manualDatacode[0]==1) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*ten[b]);}
        if(manualDatacode[0]==2) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*fifteen[b]);}
        if(manualDatacode[0]==3) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*twenty[b]);}
        if(manualDatacode[0]==4) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*highcolor[b]);}
        if(manualDatacode[0]==5) {for(char b=0;b<7;b++)Tlc.set(b, 4095-manualDatacode[1]*blue[b]);}
        Tlc.set(7, 0);
        Tlc.update();
        /*Serial.print("output setting!");
        Serial.print(datacode[y][0]);
        Serial.print(datacode[y][1]);
        Serial.println(datacode[y][2]);   */     

    }else{ 
Serial.print("!!Else Mode!!");
      if(digitalRead(sw1)==LOW)
      {
        delay(200);
        if(out1>100)out1=0;      
        else out1=int(out1+3.3);
        for(char b=0;b<8;b++)Tlc.set(b, 4095-out1*five[b]);
      }
      if(digitalRead(sw2)==LOW)
      {
        delay(200);
        if(out2>100)out2=0;      
        else out2=int(out2+3.3);
        for(char b=0;b<8;b++)Tlc.set(b, 4095-out2*ten[b]);
      }
        if(digitalRead(sw3)==LOW)
      {
        delay(200);
        if(out3>100)out3=0;      
        else out3=int(out3+3.3);
        for(char b=0;b<8;b++)Tlc.set(b, 4095-out3*fifteen[b]);
      }
        if(digitalRead(sw4)==LOW)
      {
        delay(200);
        if(out4>100)out4=0;     
        else out4=int(out4+3.3);
        for(char b=0;b<8;b++)Tlc.set(b, 4095-out4*twenty[b]);      
      }
        if(digitalRead(sw5)==LOW)
      {
        delay(200);
        if(out5>100)out5=0;      
        else out5=int(out5+3.3);
        for(char b=0;b<8;b++)Tlc.set(b, 4095-out5*highcolor[b]);
      }
        if(digitalRead(sw6)==LOW)
      {
        delay(200);
        if(out6>100)out6=0;      
        else out6=int(out6+3.3);
        for(char b=0;b<8;b++)Tlc.set(b, 4095-out6*blue[b]);
      }
      
      Tlc.set(7, 0);//0~4096
      Tlc.update();

    }


   /* if(analogRead(fanspeed)<=3){*/
}/* Loop() */