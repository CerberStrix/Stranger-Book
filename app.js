 const menuItems = document.querySelectorAll('.menu-item');

 const messagesNotification = document.querySelector('#messages-notifications');
 const messages = document.querySelector('.messages');
 const allMessage = messages.querySelectorAll('.message');
 const messageSearch = document.querySelector('#message-search');

 const theme = document.querySelector('#theme');
 const themeModal = document.querySelector('.customize-theme');

 const fontsSizes = document.querySelectorAll('.choose-size span');
 var root = document.querySelector(':root');
 const colorPalette = document.querySelectorAll('.choose-color span');

 const bg1 = document.querySelector('.bg-1');
 const bg2 = document.querySelector('.bg-2');
 const bg3 = document.querySelector('.bg-3');

 const changeActiveItem = () => {
  menuItems.forEach(item => {
    item.classList.remove('active');
  })
 }

 menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    changeActiveItem();
    item.classList.add('active')

    if(item.id != 'notifications') {
      document.querySelector('.notifications-popup').style.display = 'none';
    } else {
      document.querySelector('.notifications-popup').style.display = 'block';
      document.querySelector('#notifications .notification-count').style.display = 'none'
    }
  })
 })

messagesNotification.addEventListener('click', () => {
  messages.style.boxShadow = '0 0 1rem var(--color-primary)';
  messagesNotification.querySelector('.notification-count').style.display ='none';
  setTimeout(() => {
    messages.style.boxShadow = 'none'
  }, 2000);
})

const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  console.log(val);
  allMessage.forEach((chat) => {
    let name = chat.querySelector('h5').textContent.toLowerCase();
    if(name.indexOf(val) != -1) {
      chat.style.display = 'flex';
    } else {
      chat.style.display = 'none';
    }
  })
}

messageSearch.addEventListener('keyup', searchMessage);


const openThemeMOdal = () => {
  themeModal.style.display = 'grid';
}

const closeThemeModal = (e) => {
  if(e.target.classList.contains('customize-theme')) {
    themeModal.style.display = 'none';
  }
}

themeModal.addEventListener('click', closeThemeModal)
theme.addEventListener('click', openThemeMOdal);


const sizesMap = {
  1: {
    fontSize: '10px',
    stickyTopLeft: '5.4rem',
    stickyTopRight: '5.4rem',
  },
  2: {
    fontSize: '13px',
    stickyTopLeft: '5.4rem',
    stickyTopRight: '-7rem',
  },
  3: {
    fontSize: '16px',
    stickyTopLeft: '-2rem',
    stickyTopRight: '-17rem',
  },
  4: {
    fontSize: '19px',
    stickyTopLeft: '-5rem',
    stickyTopRight: '-25rem',
  },
  5: {
    fontSize: '22px',
    stickyTopLeft: '-12rem',
    stickyTopRight: '-35rem',
  },
};

const palettesMap = {
  1: 252,
  2: 52,
  3: 352,
  4: 152,
  5: 202,
}

const removeSizeSelector = () => {
  fontsSizes.forEach(size => {
    size.classList.remove('active');
  })
}

fontsSizes.forEach(size => {
  const fontNum = size.dataset.fontSize;
  size.addEventListener('click', () => {
    removeSizeSelector();
    size.classList.toggle('active');
    const { fontSize, stickyTopLeft, stickyTopRight} = sizesMap[fontNum];
    document.querySelector('html').style.fontSize = fontSize;
    root.style.setProperty('----sticky-top-left', stickyTopLeft);
    root.style.setProperty('----sticky-top-right', stickyTopRight);
  })
});

const removePaletteSelector = () => {
  colorPalette.forEach(color => {
    color.classList.remove('active');
  })
}

colorPalette.forEach(color => {
  const hue = color.dataset.color;
  color.addEventListener('click', () => {
    removePaletteSelector();
    color.classList.toggle('active');
    root.style.setProperty('--primary-color-hue', palettesMap[hue]);
  })
})

let lightColorLightnest;
let whiteColorLightnest;
let darkColorLightnest;

const changeBG = () => {
  root.style.setProperty('--light-color-lightness', lightColorLightnest);
  root.style.setProperty('--white-color-lightness', whiteColorLightnest);
  root.style.setProperty('--dark-color-lightness', darkColorLightnest);
}

bg1.addEventListener('click', () => {
  bg3.classList.add('active');

  bg1.classList.remove('active');
  bg2.classList.remove('active')
  window.location.reload();
});

bg2.addEventListener('click', () => {
  darkColorLightnest = '95%'
  whiteColorLightnest = '20%'
  lightColorLightnest = '15%';

  bg2.classList.add('active');

  bg1.classList.remove('active');
  bg3.classList.remove('active')
  changeBG();
});

bg3.addEventListener('click', () => {
  darkColorLightnest = '95%'
  whiteColorLightnest = '10%'
  lightColorLightnest = '0%';

  bg3.classList.add('active');

  bg1.classList.remove('active');
  bg2.classList.remove('active')
  changeBG();
});


