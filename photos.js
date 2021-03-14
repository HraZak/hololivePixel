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
            firstBear.src = `yukihanaLamy/bear1.webp`;
            firstBear.alt = `Yukihana Lamy - Bear - front view`;
            page.appendChild(firstBear);

            const secondBear = document.createElement('img');
            secondBear.className = 'secondBear';
            secondBear.src = `yukihanaLamy/bear2.webp`;
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

const footer = document.querySelector('footer');

function searchFolder(folderName) {
    for (let character of characters) {
        if (character.folder === folderName)
            return character;
    }
}

function createPage(event) {
    const photos = event.target;

    const character = searchFolder(photos.id);
    const page = document.querySelector(`#${photos.id} div.page`);

    const first = document.createElement('img');
    first.className = 'first';
    first.src = `${character.folder}/1.webp`;
    first.alt = `${character.name} - front view`;
    page.appendChild(first);

    const second = document.createElement('img');
    second.className = 'second';
    second.src = `${character.folder}/2.webp`;
    second.alt = `${character.name} - side view`;
    page.appendChild(second);

    if (character.special) {
        character.special(page);
    }

    photos.removeEventListener(
        'mouseenter',
        createPage
    )
}

function createPhotos(character) {
    const photos = document.createElement('div');
    photos.className = 'photos';
    photos.id = character.folder;

    photos.addEventListener(
        'mouseenter',
        createPage
    )

    const book = document.createElement('img');
    book.src = `${character.folder}/book.webp`;
    book.alt = `${character.name} - book`;
    photos.appendChild(book);

    const page = document.createElement('div');
    page.className = 'page';
    photos.appendChild(page);

    footer.insertAdjacentElement('beforebegin', photos);
}

for (let character of characters) {
    createPhotos(character);
}
