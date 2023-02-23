/*
 * Starter Project for WhatsApp Echo Bot Tutorial
 *
 * Remix this as the starting point for following the WhatsApp Echo Bot tutorial
 *
 */

"use strict";
// and save it as environment variable into the .env file)
const token = process.env.WHATSAPP_TOKEN;

const m1 = "Selamat datang di *Kalkulator Risiko Kanker Payudara*. Kami akan membantu untuk mengetahui risiko kanker payudara Anda dan memberikan rekomendasi metode deteksi dini yang tepat.";
const m2 = "Sebelum melakukan pengisian, harap perhatikan beberapa hal berikut : \n\n1. Untuk jawaban berupa angka, cukup isikan angka saja. \n2. Jika terdapat pesan *Maaf saya belum mengerti*,  Silakan dijawab kembali dengan jawaban lain. \n3. Ketik *Selesai* jika Anda ingin menyudahi sesi. \n4. Jika terdapat kesalahan pada sistem, Anda dapat membatalkan sesi dengan mengetik *Cek* untuk melakukan pengecekan kembali. \n\nApakah Anda bersedia melakukannya?";
const m3 = "hasil : IMT anda ... dan termasuk dalam kategori ... ";
const m4 = "Untuk mengakhiri sesi ini ketik *selesai*";
const m5 = "Terimakasih atas partisipasinya dalam melakukan pengecekan deteksi dini penyakit kanker. Skor anda ...... Anda termasuk dalam kategori ......Jika ingin melakukan pengecekan kembali, ketik *cek*.";
const m61 = "Kami merekomendasikan Anda untuk melakukan SADANIS dan pemeriksaan USG setiap tiga tahun sekali.";
const m62 = "Kami merekomendasikan Anda untuk melakukan SADANIS dan pemeriksaan USG satu kali setiap tahun."
const m63 = "Kami merekomendasikan Anda untuk melakukan konseling genetik dan tes BRCA1/2."
const m7 = "Sebagai apresiasi terhadap keikutsertaan dalam pengisian chatbot kami mempersembahkan:"
            +"\n1. Buku Saku Deteksi Dini Kanker Payudara"
            +"\nhttps://bit.ly/Buku_Saku_Deteksi_Dini_Kanker_Payudara\n"
            +"\n2. Video Edukasi Sadari"
            +"\nLink: https://youtu.be/bzZmQ-l-IUI\n"
            +"\n3. Video Edukasi Sadanis"
            +"\nLink: https://youtu.be/DL7a8JHtfa0\n"
            +"\n4. Video Edukasi USG Payudara"
            +"\nLink: https://youtu.be/jeRo7efdHlA\n"
            +"\n5. Video Edukasi Mamografi"
            +"\nLink: https://youtu.be/x-248IlEsOU\n"
            +"\n6. Video Edukasi MRI Payudara"
            +"\nLink: https://youtu.be/N_wICbIWOvI\n"
            +"\nSelamat menikmati, semoga bermanfaat."
            ;

const q1 = "Apakah Anda berusia ≥ 50 tahun?";
const q2 = "Berapa berat badan Anda? Contoh: Jika berat Anda 45 kg cukup ketikan 45";
const q3 = "Berapa tinggi badan Anda? Contoh : Jika tinggi badan Anda 155 cm, ketikan 1.55 menggunakan titik";
const q4 = "Apakah Anda mempunyai riwayat tumor jinak payudara?";
const q5 = "Apakah Anda belum menikah hingga usia > 30 tahun?";
const q6 = "Apakah Anda belum memiliki anak hingga usia > 30 tahun?";
const q7 = "Apakah Anda tidak menyusui hingga usia > 30 tahun?";
const q8 = "Apakah Anda mempunyai riwayat KB Hormonal > 10 tahun?";

const q9 = "Apakah Anda memiliki orang tua/saudara kandung yang pernah terdiagnosis kanker payudara atau kanker indung telur (ovarium)?";

const q10 = "Apakah orang tua atau saudara kandung Anda yang mempunyai riwayat kanker payudara atau kanker indung telur (ovarium), terdiagnosis pada usia <40 tahun)? ";
const q11 = "Apakah orang tua atau saudara kandung Anda yang mempunyai riwayat kanker payudara atau kanker indung telur (ovarium), berjumlah dua orang atau lebih?  ";
const q12 = "Apakah orang tua atau saudara kandung Anda yang mempunyai riwayat kanker payudara atau kanker indung telur (ovarium), ada yang berjenis kelamin laki-laki?";
const q13 = "Apakah orang tua atau saudara kandung Anda yang mempunyai riwayat kanker payudara, mengalaminya pada payudara kiri dan kanan? ";
const q14 = "Apakah orang tua atau saudara kandung Anda yang mempunyai riwayat kanker payudara, mempunyai riwayat pemeriksaan imunohistokimia triple negative?";
const q15 = "Apakah orang tua atau saudara kandung Anda yang mempunyai riwayat kanker payudara, mempunyai riwayat pemeriksaan genetik kanker payudara dengan hasil yang positif?";

var weight = 0.0
var height = 0.0
var bmi = 0.0

var total = 0.0

var risiko = "Rendah"
var val_r = 0

var val_q1 =0
var val_q2 =0
var val_q3 =0
var val_q4 =0
var val_q5 =0
var val_q6 =0
var val_q7 =0
var val_q8 =0
var val_q9 =0
var val_q10 =0
var val_q11 =0
var val_q12 =0
var val_q13 =0
var val_q14 =0

// Access token for your app
// (copy token from DevX getting started page
// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  axios = require("axios").default,
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log("webhook is listening "));

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  // Parse the request body from the POST
  let body = req.body;

  // Check the Incoming webhook message
  console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.messages &&
      req.body.entry[0].changes[0].value.messages[0]
    ) {
      
      //#############################################################
      
      if(req.body.entry[0].changes[0].value.messages[0].text){
        
      ///////////////////////////////////////////////////////////////
        
        if(req.body.entry[0].changes[0].value.messages[0].text.body.toLowerCase() == "cek"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": m1
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "next_1",
                        "title": "Next"
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
        }else if(req.body.entry[0].changes[0].value.messages[0].text.body.toLowerCase() == "selesai"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: "Terimakasih, data anda tidak akan diproses lebih lanjut. Jika ingin melakukan pengecekan kembali ketik *cek*"
              },
            },
            headers: { "Content-Type": "application/json" },
          });
          weight = 0.0
          height = 0.0
          bmi = 0.0

          total = 0.0
            
          risiko = "Rendah"
          val_r = 0
        }
        else if(parseFloat(req.body.entry[0].changes[0].value.messages[0].text.body)>4.0){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
          
          weight = parseFloat(msg_body);
          if(weight > 120){
            axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: "Maaf Saya Tidak Mengerti \n\nIndikasi Kesalahan Sistem: jika anda salah mengetikkan *tinggi badan*, Ketikkan kembali *berat badan* anda. Jika tidak, "+q3
              },
            },
            headers: { "Content-Type": "application/json" },
          });
          }else{
            axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: q3 
              },
            },
            headers: { "Content-Type": "application/json" },
          });  
          }
          
        }else if(parseFloat(req.body.entry[0].changes[0].value.messages[0].text.body)<4.0){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
          
          height = parseFloat(msg_body);
          bmi = weight/(height*height)
          var obes = "normal"
          if(bmi>30.0){
            obes = "obesitas"
            total+=1
            val_q2 = 1

          }else if(bmi<16){
            obes = "kurang"
          }
          
          if(weight==0.0){
            axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: "Maaf Saya Tidak Mengerti \nAnda Terindikasi salah memasukkan angka. Silahkan ketikkan kembali *berat badan* Anda."
              },
            },
            headers: { "Content-Type": "application/json" },
          });
          }else{
            axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": "hasil : Index Massa Tubuh anda " + bmi.toFixed(2) + " dan termasuk dalam kategori " + obes
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "next_3",
                        "title": "Next"
                      }
                    },
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
            });  
          }
          
          
        }
        else{
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": m1
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "next_1",
                        "title": "Next"
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
        }
        
      
      
      //################################################################################
        
      } else if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply){
      
      //////////////////////////////////////////////////////////////////////////////////
        
        if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "next_1"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": m2
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_m1",
                        "title": "Yes"
                      }
                    },
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }
        else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "next_3"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q4
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q4",
                        "title": "Yes"
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q4",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "next_4"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q9
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q9",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q9",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "next_5"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          var name = req.body.entry[0].changes[0].value.contacts[0].profile.name;
          var phone_number = req.body.entry[0].changes[0].value.contacts[0].wa_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://script.google.com/macros/s/AKfycbw8iJCQNPbnRqXKS-h99zKt8-bp3toZkf5mEM-FY_uyXtI6ayTqzpj5aZboaL7SpHop/exec?"+
              "id="+phone_number_id+
              "&nama="+name+
              "&no="+phone_number+
              "&q1="+val_q1+
              "&bb="+weight+
              "&tb="+height+
              "&imt="+bmi+
              "&q2="+val_q2+
              "&q3="+val_q3+
              "&q4="+val_q4+
              "&q5="+val_q5+
              "&q6="+val_q6+
              "&q7="+val_q7+
              "&q8="+val_q8+
              "&q9="+val_q9+
              "&q10="+val_q10+
              "&q11="+val_q11+
              "&q12="+val_q12+
              "&q13="+val_q13+
              "&q14="+val_q14+
              "&total="+total+
              "&kategori="+risiko,
            data: {
              },
            headers: { "Content-Type": "application/json" },
          });
          
          if(val_r == 1){
              axios({
              method: "POST", // Required, HTTP method, a string, e.g. POST, GET
              url:
                "https://graph.facebook.com/v12.0/" +
                phone_number_id +
                "/messages?access_token=" +
                token,
              data: {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "body": {
                    "text": m61
                  },
                  "action": {
                    "buttons": [
                      {
                        "type": "reply",
                        "reply": {
                          "id": "next_6",
                          "title": "Next"
                        }
                      },
                    ]
                  }
                }
              },
              headers: { "Content-Type": "application/json" },
              });  
          }else if(val_r == 2){
            axios({
              method: "POST", // Required, HTTP method, a string, e.g. POST, GET
              url:
                "https://graph.facebook.com/v12.0/" +
                phone_number_id +
                "/messages?access_token=" +
                token,
              data: {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "body": {
                    "text": m62
                  },
                  "action": {
                    "buttons": [
                      {
                        "type": "reply",
                        "reply": {
                          "id": "next_6",
                          "title": "Next"
                        }
                      },
                    ]
                  }
                }
              },
              headers: { "Content-Type": "application/json" },
              });
          }else if(val_r == 3){
            axios({
              method: "POST", // Required, HTTP method, a string, e.g. POST, GET
              url:
                "https://graph.facebook.com/v12.0/" +
                phone_number_id +
                "/messages?access_token=" +
                token,
              data: {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "body": {
                    "text": m63
                  },
                  "action": {
                    "buttons": [
                      {
                        "type": "reply",
                        "reply": {
                          "id": "next_6",
                          "title": "Next"
                        }
                      },
                    ]
                  }
                }
              },
              headers: { "Content-Type": "application/json" },
              });
          }
          
                  
          weight = 0.0
          height = 0.0
          bmi = 0.0

          total = 0.0
            
          risiko = "Rendah"
          val_r = 0
          
          val_q1 =0
          val_q2 =0
          val_q3 =0
          val_q4 =0
          val_q5 =0
          val_q6 =0
          val_q7 =0
          val_q8 =0
          val_q9 =0
          val_q10 =0
          val_q11 =0
          val_q12 =0
          val_q13 =0
          val_q14 =0

          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "next_6"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: m7
              },
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }
        else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_m1"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q1
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q1",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q1",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q1" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q1"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q1"){
            total+=1
            val_q1 = 1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q1"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: q2 
              },
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q4" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q4"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q4"){
            total+=1
            val_q3 = 1
          
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q4"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q5
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q5",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q5",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q5" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q5"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q5"){
            total+=1
            val_q4 =1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q5"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q6
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q6",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q6",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q6" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q6"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q6"){
            total+=1
            val_q5 =1

          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q6"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q7
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q7",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q7",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q7" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q7"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q7"){
            total+=1
            val_q6 = 1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q7"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q8
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q8",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q8",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q8" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q8"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q8"){
            total+=1            
            val_q7 =1

          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q8"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q9
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q9",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q9",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }
        else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q9" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q9"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if(total<3){
            risiko = "Rendah"
            val_r = 1
          }else if(total>2 && total<8){
            risiko = "Tinggi"
            val_r = 2
          }
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q9"){
            total+=1
            
            risiko = "Sangat Tinggi"
            val_r = 3
            
            val_q8 = 1 
          
            
            axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q10
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q10",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q10",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q9"){
            
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": "Terimakasih atas partisipasinya dalam melakukan pengecekan deteksi dini penyakit kanker. Skor anda "+total+". Anda termasuk dalam kategori "+ risiko +". Jika ingin melakukan pengecekan kembali, ketik *cek*."
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "next_5",
                        "title": "Next"
                      }
                    },
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
            });
          }
          
        }
        else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q10" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q10"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q10"){
            total+=1
            val_q9 = 1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q10"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q11
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q11",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q11",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q11" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q11"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q11"){
            total+=1
            val_q10 =1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q11"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q12
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q12",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q12",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q12" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q12"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q12"){
            total+=1
            val_q11 =1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q12"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q13
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q13",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q13",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q13" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q13"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q13"){
            total+=1
            val_q12 =1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q13"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q14
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q14",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q14",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q14" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q14"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q14"){
            total+=1
            val_q13 =1

          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q14"){
            total+=0
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": q15
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "yes_q15",
                        "title": "Yes",
                      }
                    },
                    {
                      "type": "reply",
                      "reply": {
                        "id": "no_q15",
                        "title": "No",
                      }
                    }
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
          });
          
        }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q15" ||
                 req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q15"){
          
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          
          if (req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "yes_q15"){
            total+=1
            val_q14 =1
          }else if(req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.id == "no_q15"){
            total+=0
            
            // if(total<3){
            //   risiko = "Rendah"
            //   val_r = 1
            // }else if(total>2 && total<9){
            //   risiko = "Tinggi"
            //   val_r = 2
            // }else{
            //   risiko = "Sangat Tinggi"
            //   val_r = 3
            // }
          }
          
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              "type": "interactive",
              "interactive": {
                "type": "button",
                "body": {
                  "text": "Terimakasih atas partisipasinya dalam melakukan pengecekan deteksi dini penyakit kanker. Anda termasuk dalam kategori "+ risiko +". Jika ingin melakukan pengecekan kembali, ketik *cek*."
                },
                "action": {
                  "buttons": [
                    {
                      "type": "reply",
                      "reply": {
                        "id": "next_5",
                        "title": "Next"
                      }
                    },
                  ]
                }
              }
            },
            headers: { "Content-Type": "application/json" },
            });
                    
        }
        else{
          let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          axios({
            method: "POST", // Required, HTTP method, a string, e.g. POST, GET
            url:
              "https://graph.facebook.com/v12.0/" +
              phone_number_id +
              "/messages?access_token=" +
              token,
            data: {
              messaging_product: "whatsapp",
              to: from,
              text: { 
                body: "Invalid Choice"
              },
            },
            headers: { "Content-Type": "application/json" },
          });
        }  
              
      //##################################################################################
        
      // } 
      // else if (req.body.entry[0].changes[0].value.messages[0].interactive.list_reply){
      
      /////////////////////////////////////////////////////////////////////////////////////
//         let phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
//         let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
        
//         var target_class = "Kurang Diperhatikan"
        
//         if(req.body.entry[0].changes[0].value.messages[0].interactive.list_reply.id == "ls_7"){
//           axios({
//             method: "POST", // Required, HTTP method, a string, e.g. POST, GET
//             url:
//               "https://graph.facebook.com/v12.0/" +
//               phone_number_id +
//               "/messages?access_token=" +
//               token,
//             data: {
//               messaging_product: "whatsapp",
//               to: from,
//               "type": "interactive",
//               "interactive": {
//                 "type": "button",
//                 "body": {
//                   "text": "Terimakasih atas partisipasinya dalam melakukan pengecekan deteksi dini penyakit kanker. Skor anda "+total+". Anda termasuk dalam kategori "+ target_class +". Jika ingin melakukan pengecekan kembali, ketik *cek*."
//                 },
//                 "action": {
//                   "buttons": [
//                     {
//                       "type": "reply",
//                       "reply": {
//                         "id": "next_5",
//                         "title": "Next"
//                       }
//                     },
//                   ]
//                 }
//               }
//             },
//             headers: { "Content-Type": "application/json" },
//             });
//           weight = 0.0
//           height = 0.0
//           bmi = 0.0

//           total = 0.0
//         }else{
//           axios({
//             method: "POST", // Required, HTTP method, a string, e.g. POST, GET
//             url:
//               "https://graph.facebook.com/v12.0/" +
//               phone_number_id +
//               "/messages?access_token=" +
//               token,
//             data: {
//               messaging_product: "whatsapp",
//               to: from,
//               "type": "interactive",
//               "interactive": {
//                 "type": "button",
//                 "body": {
//                   "text": q10
//                 },
//                 "action": {
//                   "buttons": [
//                     {
//                       "type": "reply",
//                       "reply": {
//                         "id": "yes_q10",
//                         "title": "Yes",
//                       }
//                     },
//                     {
//                       "type": "reply",
//                       "reply": {
//                         "id": "no_q10",
//                         "title": "No",
//                       }
//                     }
//                   ]
//                 }
//               }
//             },
//             headers: { "Content-Type": "application/json" },
//           });
        // }
        
      //###### 
        
      }else {
        
      ////////
        
        console.log("eror message disini 1")
      }
      
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests 
app.get("/webhook", (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
  **/
  const verify_token = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});
