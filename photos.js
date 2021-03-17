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
    { name: 'Usada Pekora', folder: 'usadaPekora', special: function (page) { page.classList.add('pekora') } },
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
        name: 'Yukihana Lamy', folder: 'yukihanaLamy', special: function (page) {
            const firstBear = document.createElement('img');
            firstBear.className = 'firstBear';
            firstBear.src = `img/yukihanaLamy/bear1.webp`;
            firstBear.alt = `Yukihana Lamy - Bear - front view`;
            page.appendChild(firstBear);

            const secondBear = document.createElement('img');
            secondBear.className = 'secondBear';
            secondBear.src = `img/yukihanaLamy/bear2.webp`;
            secondBear.alt = `Yukihana Lamy - Bear - side view`;
            page.appendChild(secondBear);
        }
    },
    { name: 'Shishiro Botan', folder: 'shishiroBotan' },
    { name: 'Shirogane Noel', folder: 'shiroganeNoel' },
    { name: 'Tokoyami Towa', folder: 'tokoyamiTowa' },
    { name: 'Houshou Marine', folder: 'houshouMarine' },
    { name: 'Himemori Luna', folder: 'himemoriLuna' }
];

let loadedImg = 0;
let loadingPer = 0;
const oneLoadingPer = 100 / (characters.length * 3);

const footer = document.querySelector('footer');
const loading = document.getElementById('loading');

function changeSrc(character) {
    const photos = document.getElementById(`${character.folder}`);
    const first = document.querySelector(`#${photos.id} div.page img.first`)
    const second = document.querySelector(`#${photos.id} div.page img.second`)

    first.src = `img/${character.folder}/1.webp`;
    first.addEventListener(
        'load',
        increaseLoading
    )
    first.addEventListener(
        'error',
        increaseLoading
    )
    second.src = `img/${character.folder}/2.webp`;
    second.addEventListener(
        'load',
        increaseLoading
    )
    second.addEventListener(
        'error',
        increaseLoading
    )

    if (character.special) {
        character.special(document.querySelector(`#${photos.id} div.page`));
    }
}

function addLoadedImg(event) {
    event.target.removeEventListener(
        'load',
        addLoadedImg
    )
    event.target.removeEventListener(
        'error',
        addLoadedImg
    )
    loadedImg++;
    if (loadedImg === characters.length) {
        for (let character of characters) {
            changeSrc(character);
        }
    }
}
function increaseLoading(event) {
    event.target.removeEventListener(
        'load',
        increaseLoading
    )
    event.target.removeEventListener(
        'error',
        increaseLoading
    )
    loadingPer += oneLoadingPer;
    loading.style.width = `${loadingPer}%`;
    if (loadingPer >= 100) {
        loading.style.display = 'none';
    }
}

function createPhotos(character) {
    const photos = document.createElement('div');
    photos.className = 'photos';
    photos.id = character.folder;
    photos.addEventListener(
        'mouseenter',
        removeShake
    )

    const book = document.createElement('img');
    book.src = `img/${character.folder}/book.webp`;
    book.alt = `${character.name} - book`;
    book.addEventListener(
        'load',
        addLoadedImg
    )
    book.addEventListener(
        'error',
        addLoadedImg
    )
    book.addEventListener(
        'load',
        increaseLoading
    )
    book.addEventListener(
        'error',
        increaseLoading
    )
    photos.appendChild(book);

    const page = document.createElement('div');
    page.className = 'page';
    photos.appendChild(page);

    const first = document.createElement('img');
    first.className = 'first';
    first.src = '';
    first.alt = `${character.name} - front view`;
    page.appendChild(first);

    const second = document.createElement('img');
    second.className = 'second';
    second.src = '';
    second.alt = `${character.name} - side view`;
    page.appendChild(second);

    footer.insertAdjacentElement('beforebegin', photos);
}

for (let character of characters) {
    createPhotos(character);
}

const firstCharacter = document.querySelector(`#${characters[0].folder} img`);
firstCharacter.classList.add('shake');

function removeShake() {
    firstCharacter.classList.remove('shake');
    for (let photo of document.getElementsByClassName('photos')) {
        photo.removeEventListener(
            'mouseenter',
            removeShake
        )
    }
}
