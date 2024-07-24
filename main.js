//! HTML den gelenler
const chatInput = document.querySelector("#chat-input");
const sendButton =  document.querySelector("#send-btn");
const defaultText = document.querySelector(".default-text");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
console.log(deleteButton);

let userText = null;
//! gönderdiğimiz html ve class ismine göre bize bir html oluşturur 
const createElement = (html, className) => {
   // console.log(html);
  //  console.log(className);
    //yeni div oluştur
    const chatDiv = document.createElement("div");
    //oluşan dive  chat ve dışardan gelen classı ekle 
    chatDiv.classList.add("chat", className);
    //oluşturduğumuz divin içine dışarıdan parametre olarak gelen html parametresini ekle
    chatDiv.innerHTML = html;
    //console.log(chatDiv);
     return chatDiv;
};
const getChatResponse = async(incomingChatDiv) =>{
    //apı den gelen cevabı aktarmak için p etiketi oluşturduk
const pElement = document.createElement("p");
console.log(pElement);
//1. adım : url i al
const url = 'https://chatgpt-42.p.rapidapi.com/geminipro';
//2. adım: optionsu tanımla
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'e552ca3b70msh455368d175ebc4bp1e7692jsn5d54ecf619e2',
		'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		messages: [
			{
				role: 'user',
				content: `${userText}`,
			},
		],
		temperature: 0.9,
		top_k: 5,
		top_p: 0.9,
		max_tokens: 256,
		web_access: false
	},)
};
//3.adım: API ye istek at
//fetch(url, options)
//gelen cevabı yakala jsona çevir
//.then((res) => res.json())
//jsona çevrilmiş veriyi yakalayıp işlemler gerçekşeştirebiriz
//.then((data) => console.log(data.result))
//hata varsa yakala
//.catch((error) => console.log(error));
//try-catch gerek yazım hatası gerekse istek hatalarında kullnabiliriz

 try{// apı ye url ve options u kullanarak istek at ve bekle
   const response = await fetch(url, options);
   //gelen cevabı json a cevir ve bekle 
   const result = await response.json();
   //console.log(result);
//API den gelen cevabı oluşturduğumuz p etiketinin içine aktardık
   pElement.innerHTML = result.result;
 }catch(error){
console.log(error)
 }
console.log(incomingChatDiv);
//animasyonu kaldırabilmek için querySelector ile seçtik ve ekrandan remove ile kaldırdık
 incomingChatDiv.querySelector(".typing-animation").remove();
 // API den gelene cevabı ekrana aktarabilmek için chat-details i seçip bir değişkene  aktardık
 //const detailDiv = incomingChatDiv.querySelector(".chat-details");
 // bu detail içiresine oluşturduğumuz pElent etiketine aktardık
 //detailDiv.appendChild(pElement); 2. yol:

 incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
 //inputun içini resetledik
 chatInput.value = null;
};

//! gelen cevabı oluşturma
const showTypingAnimation = () =>{
    const html = `
    <div class="chat-content">
      <div class="chat-details">
         <img src="./images/chatbot.jpg" alt="">
            <div class="typing-animation">
                <div class="typing-dot" style="--delay:0.2s"></div>
                <div class="typing-dot" style="--delay:0.3s"></div>
                <div class="typing-dot" style="--delay:0.4s"></div>
            </div>
       </div>
     </div>
    `;
    const incomingChatDiv = createElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    //console.log(incomingChatDiv);
    getChatResponse(incomingChatDiv);
}

//! gönderme buttonuna erişme ve düzenleme 
const handleOutGoingChat = () => {
    userText = chatInput.value.trim();//inputun içindeki değeri al ve boşlukları sil
   // console.log(userText);
    if(!userText){//inputun içinde veri yoksa durdur
        alert("Bir veri giriniz!!!")
        return;
    }
   // console.log("çalıştı");
   const html = `
    <div class="chat-content">
         <div class="chat-details">
            <img src="./images/user.jpg" alt="">
            <p></p>
         </div>
    </div>
   `;
 //! kullanıcının mesajını içeren bir div oluştur ve chatContainer yapısına ekle
  const outgoingChatDiv = createElement(html,"outgoing");
  defaultText.remove(); //varsayılan 
  outgoingChatDiv.querySelector("p").textContent = userText;
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
  
};

//! Olay İzleyicileri
sendButton.addEventListener("click", handleOutGoingChat);
//textarea içerisinde klavyeden herhangi bir tuşa bastığımız anda bu olay çalışır
chatInput.addEventListener("keydown", (e) =>{
    console.log(e);
    //klavyeden enter tusunu aktif ettik 
    if(e.key === "Enter"){
        handleOutGoingChat();
    }
});
//!dark-light mode
themeButton.addEventListener("click", () =>{
    document.body.classList.toggle("light-mode");
   themeButton.innerText = document.body.classList.contains("light-mode")
   ? "dark_mode"
   : "light_mode";
});
//! sil butonuna tıkladığımızda chatcontainer i sil ve defaulttext aktar
deleteButton.addEventListener("click", () =>{
    //confirm ile ekrana uyarı bastırdık tamam tuşu=true,iptal tuşu=false dönderir
    if(confirm("Tüm sohbetleri silmek istediğine emin misiniz?")){
        chatContainer.remove();
    };
    const defaultText =
    `<div class="default-text">
        <h1>ChatGPT Clone</h1>
    </div> 
    <div class="chat-container"></div>
     <div class="typing-container">
        <div class="typing-content">
            <div class="typing-textarea">
                <textarea  id="chat-input" placeholder="Enter a propmt here..."></textarea>
                <span class="material-symbols-outlined" id="send-btn"> send </span>
            </div>
                    <div class="typing-controls">
                        <span class="material-symbols-outlined" id="theme-btn">light_mode</span>
                        <span class="material-symbols-outlined" id="delete-btn">delete</span>
                    </div>
            
        </div>
    </div>`;

    document.body.innerHTML = defaultText;
})