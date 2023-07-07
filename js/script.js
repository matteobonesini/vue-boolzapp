let DateTime = luxon.DateTime;
const { createApp } = Vue

createApp({
  data() {
    return {
      contacts: [ 
        {
          name: 'Michele',
          avatar: './img/avatar_1.jpg',
          visible: true,
          messages: [
            {
                date: '01/10/2020 15:30:55',
                message: 'Hai portato a spasso il cane?',
                status: 'sent'
            },
            {
                date: '01/10/2020 15:50:00',
                message: 'Ricordati di stendere i panni',
                status: 'sent'
            },
            {
                date: '01/10/2020 16:15:22',
                message: 'Tutto fatto!',
                status: 'received'
            } 
          ],
        }, 
        {
          name: 'Fabio',
          avatar: './img/avatar_2.jpg',
          visible: true,
          messages: [
            {
              date: '03/20/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            }, 
            {
              date: '03/20/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            }, 
            {
              date: '03/20/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            } 
          ],
          
        }, 
        {
          name: 'Samuele',
          avatar: './img/avatar_3.jpg',
          visible: true,
          messages: [
            {
                date: '03/28/2020 10:10:40',
                message: 'La Marianna va in campagna',
                status: 'received'
            }, 
            {
              date: '03/28/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            }, 
            {
              date: '03/28/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            } 
          ],
        }, 
        {
          name: 'Alessandro B.',
          avatar: './img/avatar_4.jpg',
          visible: true,
          messages: [
            {
                date: '01/10/2020 15:30:55',
                message: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent'
            }, {
              date: '01/10/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            } 
          ],
        },
        {
          name: 'Alessandro L.',
          avatar: './img/avatar_5.jpg',
          visible: true,
          messages: [
            {
              date: '01/10/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '01/10/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          avatar: './img/avatar_6.jpg',
          visible: true,
          messages: [
            {
              date: '01/10/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '01/10/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '01/10/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          avatar: './img/avatar_7.jpg',
          visible: true,
          messages: [
            {
              date: '01/10/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '01/10/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          avatar: './img/avatar_8.jpg',
          visible: true,
          messages: [
            {
              date: '01/10/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '01/10/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '01/10/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ],
      currentChat: 0,
      searchInput: '',
      textMessage: '',
      clickedMessageIndex: null,
      dropDownStylePosition: {
        top: 0 + 'px',
        left: 0 + 'px'
      },
      onlineUser: ''
    }
  },
  mounted() {
    this.setOnlineUser('');
  },
  methods: {
    setCurrentChat(i){
      this.currentChat = i;
      this.setOnlineUser('')
      this.hideDropdown();
    },
    getMessageTime(date) {
      const time = DateTime.fromFormat(date, "LL/dd/yyyy HH:mm:ss");
      return time.toLocaleString(DateTime.TIME_SIMPLE);
    },
    sendMessage() {
      this.setOnlineUser('online');
      const currentContact = this.contacts[this.currentChat];
      currentContact.messages.push({
        date: DateTime.now().toFormat("LL/dd/yyyy HH:mm:ss"),
        message: this.textMessage,
        status: 'sent'
      })
      
      this.textMessage = '';

      setTimeout(() => {
        this.setOnlineUser('scrivendo');
      }, 1000)

      setTimeout(() => {
        currentContact.messages.push({
          date: DateTime.now().toFormat("LL/dd/yyyy HH:mm:ss"),
          message: 'ok',
          status: 'received'
        });
        this.setOnlineUser('');
      }, 2000)
    },
    searchContacts() {
      this.contacts.forEach(contact => {
        const name = contact.name.toLowerCase();
        const input = this.searchInput.toLowerCase()
        if (name.includes(input)) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      });

    },
    showDropdown(i, e) {
      this.clickedMessageIndex = i;
      let dropDownX = e.clientX;
      const dropDownY = e.clientY;
      const maxVW = e.view.innerWidth;
      const maxX = maxVW - ((maxVW * 0.1) + 210);
      if (dropDownX > maxX) {
        dropDownX -= 200;
      }
      const dropDownXPercent = (dropDownX * 100) / maxVW;
      this.dropDownStylePosition.top = dropDownY + 'px';
      this.dropDownStylePosition.left = dropDownXPercent + '%';
    },
    hideDropdown() {
      this.clickedMessageIndex = null;
    },
    lastMessage(messages) {
      if (messages.length > 0) {
        const length = messages.length;
        let message = messages[length - 1].message;
        return message;
      };
      return '';
    },
    lastMessageTime(messages) {
      if (messages.length > 0) {
        const length = messages.length;
        const dateString = messages[length - 1].date;
        const time = DateTime.fromFormat(dateString, "LL/dd/yyyy HH:mm:ss");
        return time.toLocaleString(DateTime.TIME_SIMPLE);
      };
      return '';
    },
    deleteMessage(i) {
      const currentMessages = this.contacts[this.currentChat].messages;
      currentMessages.splice(this.clickedMessageIndex, 1);
      this.hideDropdown();
    },
    setOnlineUser(online) {
      if (online === 'online') {
        this.onlineUser = 'Online';
      } else if (online === 'scrivendo') {
        this.onlineUser = 'Sta scrivendo...';
      } else {
        const length = this.contacts[this.currentChat].messages.length;
        if (length > 0) {
          const dateString = this.contacts[this.currentChat].messages[length - 1].date;
          const time = DateTime.fromFormat(dateString, "LL/dd/yyyy HH:mm:ss");
          const nowTime = DateTime.now();
          if (time.toFormat('DDD') == nowTime.toFormat('DDD'))
            this.onlineUser = 'Ultimo accesso oggi alle ' + time.toFormat('HH:mm');
          else
            this.onlineUser = 'Ultimo accesso ' + time.setLocale('it').toFormat('dd LLLL') + ' alle ' + time.toFormat('HH:mm');
        }
      }
    }
  }
}).mount('#app')
