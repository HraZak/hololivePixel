var footer = document.querySelector('footer');
var characters = [
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
    { name: 'Usada Pekora', folder: 'usadaPekora', special: function (page) { page.classList.add('pekora'); } },
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
            var firstBear = document.createElement('img');
            page.appendChild(firstBear);
            firstBear.className = 'firstBear';
            firstBear.src = "./img/yukihanaLamy/bear1.webp";
            firstBear.alt = "Yukihana Lamy - Bear - front view";
            var secondBear = document.createElement('img');
            page.appendChild(secondBear);
            secondBear.className = 'secondBear';
            secondBear.src = "./img/yukihanaLamy/bear2.webp";
            secondBear.alt = "Yukihana Lamy - Bear - side view";
        }
    },
    { name: 'Shishiro Botan', folder: 'shishiroBotan' },
    { name: 'Shirogane Noel', folder: 'shiroganeNoel' },
    { name: 'Tokoyami Towa', folder: 'tokoyamiTowa' },
    { name: 'Houshou Marine', folder: 'houshouMarine' },
    { name: 'Himemori Luna', folder: 'himemoriLuna' }
];
var loadedImg = 0;
function changeSrc(character) {
    var photos = document.getElementById("" + character.folder);
    var first = document.querySelector("#" + photos.id + " div.page img.first");
    var second = document.querySelector("#" + photos.id + " div.page img.second");
    first.src = "./img/" + character.folder + "/1.webp";
    second.src = "./img/" + character.folder + "/2.webp";
    if (character.special) {
        character.special(document.querySelector("#" + photos.id + " div.page"));
    }
}
function addLoadedImg(event) {
    loadedImg++;
    if (loadedImg === characters.length) {
        for (var _i = 0, characters_2 = characters; _i < characters_2.length; _i++) {
            var character = characters_2[_i];
            changeSrc(character);
        }
    }
    event.target.removeEventListener('load', addLoadedImg);
    event.target.removeEventListener('error', addLoadedImg);
}
function unhideBookmark(event) {
    var photos = document.getElementById(event.target.id);
    document.querySelector("#" + photos.id + " div.bookmark").classList.remove('hide');
    photos.removeEventListener('mouseleave', unhideBookmark);
}
function createPhotos(character) {
    var photos = document.createElement('div');
    footer.insertAdjacentElement('beforebegin', photos);
    photos.className = 'photos';
    photos.id = character.folder;
    photos.addEventListener('mouseenter', removeShake);
    photos.addEventListener('mouseleave', unhideBookmark);
    var book = document.createElement('img');
    photos.appendChild(book);
    book.src = "./img/" + character.folder + "/book.webp";
    book.alt = character.name + " - book";
    book.addEventListener('load', addLoadedImg);
    book.addEventListener('error', addLoadedImg);
    var bookmark = document.createElement('div');
    photos.appendChild(bookmark);
    bookmark.classList.add('bookmark', 'hide');
    var page = document.createElement('div');
    photos.appendChild(page);
    page.className = 'page';
    var first = document.createElement('img');
    page.appendChild(first);
    first.className = 'first';
    first.src = '';
    first.alt = character.name + " - front view";
    var second = document.createElement('img');
    page.appendChild(second);
    second.className = 'second';
    second.src = '';
    second.alt = character.name + " - side view";
}
for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
    var character = characters_1[_i];
    createPhotos(character);
}
var firstCharacter = document.querySelector("#" + characters[0].folder + " img");
firstCharacter.classList.add('shake');
function removeShake() {
    firstCharacter.classList.remove('shake');
    for (var _i = 0, _a = document.getElementsByClassName('photos'); _i < _a.length; _i++) {
        var photo = _a[_i];
        photo.removeEventListener('mouseenter', removeShake);
    }
}
