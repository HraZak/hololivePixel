// Elementy
const footer = document.getElementById('footer');

// Promene
const characters = [
    { name: 'Tokino Sora', folder: 'tokinoSora' },
    { name: 'Aki Rosenthal', folder: 'akiRosenthal' },
    { name: 'Minato Aqua', folder: 'minatoAqua' },
    { name: 'Ookami Mio', folder: 'ookamiMio' },
    { name: 'Roboco San', folder: 'robocoSan' },
    { name: 'Yozora Mel', folder: 'yozoraMel' },
    { name: 'Murasaki Shion', folder: 'murasakiShion' },
    { name: 'Nekomata Okayu', folder: 'nekomataOkayu' },
    { name: 'Sakura Miko', folder: 'sakuraMiko' },
    { name: 'Akai Haato', folder: 'akaiHaato' },
    { name: 'Nakiri Ayame', folder: 'nakiriAyame' },
    { name: 'Inugami Korone', folder: 'inugamiKorone' },
    { name: 'Hoshimachi Suisei', folder: 'hoshimachiSuisei' },
    { name: 'Natsuiro Matsuri', folder: 'natsuiroMatsuri' },
    { name: 'Yuzuki Choco', folder: 'yuzukiChoco' },
    { name: 'Shirakami Fubuki', folder: 'shirakamiFubuki' },
    {
        name: 'Usada Pekora',
        folder: 'usadaPekora',
        special: function (page) {
            page.classList.add('pekora');
        },
    },
    { name: 'Amane Kanata', folder: 'amaneKanata' },
    { name: 'Oozora Subaru', folder: 'oozoraSubaru' },
    { name: 'AZKi', folder: 'azki' },
    { name: 'Uruha Rushia', folder: 'uruhaRushia' },
    { name: 'Kiryu Coco', folder: 'kiryuCoco' },
    { name: 'Momosuzu Nene', folder: 'momosuzuNene' },
    { name: 'Omaru Polka', folder: 'omaruPolka' },
    { name: 'Shiranui Flare', folder: 'shiranuiFlare' },
    { name: 'Tsunomaki Watame', folder: 'tsunomakiWatame' },
    {
        name: 'Yukihana Lamy',
        folder: 'yukihanaLamy',
        special: function (page) {
            const firstBear = document.createElement('img');
            firstBear.classList.add('firstBear');
            firstBear.src = `./img/yukihanaLamy/bear1.png`;
            firstBear.alt = `Yukihana Lamy - Bear - front view`;

            const secondBear = document.createElement('img');
            secondBear.classList.add('secondBear');
            secondBear.src = `./img/yukihanaLamy/bear2.png`;
            secondBear.alt = `Yukihana Lamy - Bear - side view`;

            page.append(firstBear, secondBear);
        },
    },
    { name: 'Shishiro Botan', folder: 'shishiroBotan' },
    { name: 'Shirogane Noel', folder: 'shiroganeNoel' },
    { name: 'Tokoyami Towa', folder: 'tokoyamiTowa' },
    { name: 'Houshou Marine', folder: 'houshouMarine' },
    { name: 'Himemori Luna', folder: 'himemoriLuna' },
];
let loadedImg = 0;

// Funkce
function changeSrc(character) {
    const first: HTMLImageElement = document.querySelector(`#${character.folder} div.page img.first`);
    const second: HTMLImageElement = document.querySelector(`#${character.folder} div.page img.second`);

    first.src = `./img/${character.folder}/1.png`;

    second.src = `./img/${character.folder}/2.png`;

    if (character.special) {
        character.special(document.querySelector(`#${character.folder} div.page`));
    }
}

function addLoadedImg(event: UIEvent) {
    loadedImg++;
    if (loadedImg === characters.length) {
        for (const character of characters) {
            changeSrc(character);
        }
    }

    event.currentTarget.removeEventListener('load', addLoadedImg);
    event.currentTarget.removeEventListener('error', addLoadedImg);
}
function unhideBookmark(event: MouseEvent) {
    document.querySelector(`#${event.currentTarget.id} div.bookmark`).classList.remove('hide');

    event.currentTarget.removeEventListener('mouseleave', unhideBookmark);
}

function createPhotos(character) {
    const photos = document.createElement('div');
    photos.classList.add('photos');
    photos.id = character.folder;
    photos.addEventListener('mouseenter', removeShake);
    photos.addEventListener('mouseleave', unhideBookmark);

    footer.before(photos);

    const book = document.createElement('img');
    book.src = `./img/${character.folder}/book.png`;
    book.alt = `${character.name} - book`;
    book.addEventListener('load', addLoadedImg);
    book.addEventListener('error', addLoadedImg);

    const bookmark = document.createElement('div');
    bookmark.classList.add('bookmark', 'hide');

    const page = document.createElement('div');
    page.classList.add('page');

    photos.append(book, bookmark, page);

    const first = document.createElement('img');
    first.classList.add('first');
    first.src = '#';
    first.alt = `${character.name} - front view`;

    const second = document.createElement('img');
    second.classList.add('second');
    second.src = '#';
    second.alt = `${character.name} - side view`;

    page.append(first, second);
}

// Kod
for (const character of characters) {
    createPhotos(character);
}

const firstCharacter = document.querySelector(`#${characters[0].folder} img`);
firstCharacter.classList.add('shake');

function removeShake(event: MouseEvent) {
    firstCharacter.classList.remove('shake');

    const photos = document.getElementsByClassName('photos');
    for (const photo of photos) {
        photo.removeEventListener('mouseenter', removeShake);
    }
}
