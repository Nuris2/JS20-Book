// Сохраняем API (базу данных) в переменную API
const API = "http://localhost:8000/books";

// Сохраняем элементы из html в переменные
let inpName = document.getElementById("inpName");
let inpAuthor = document.getElementById("inpAuthor");
let inpImage = document.getElementById("inpImage");
let inpPrice = document.getElementById("inpPrice");
let btnAdd = document.getElementById("btnAdd");
let sectionBooks = document.getElementById("sectionBooks");
let btnOpenForm = document.getElementById("flush-collapseOne");

// Навешиваем событие на кнопку Добавить
btnAdd.addEventListener("click", () => {
  if (
    // проверка на заполненность полей
    !inpName.value.trim() ||
    !inpAuthor.value.trim() ||
    !inpImage.value.trim() ||
    !inpPrice.value.trim()
  ) {
    alert("Заполните поле!");
    return;
  }
  let newBook = {
    // создаём новый объект, куда добавляем значения наших инпутов
    bookName: inpName.value,
    bookAuthor: inpAuthor.value,
    bookImage: inpImage.value,
    bookPrice: inpPrice.value,
  };
  createBooks(newBook); // Вызываем фунцию для добавление нвыйой крниги  в базу данных и передаем в качестве аргумента обект заданнфе выше

  readBooks(); // вызываем
});

// ! ================= CREATE =====================
// Функция для добавления новых книг в базу данных (db.json)
function createBooks(book) {
  fetch(API, {
    // отпраляем данные дяле отпраки
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(book),
  }).then(() => readBooks());
  // Соверщаем очистку инпута
  inpName.value = "";
  inpImage.value = "";
  inpAuthor.value = "";
  inpPrice.value = "";
  // Меняем класс с помпощю toggle у аккардиона для того чтобы закрв=ываался при слике в кнопку добавить
  btnOpenForm.classList.toggle("show");
}

// !=============== READ ====================
// Создаём функцию для отображения
function readBooks() {
  fetch(API) //получение данных из db.json
    .then((res) => res.json())
    .then((data) => {
      sectionBooks.innerHTML = ""; // очихаем тег section чтобы не было дубликатов
      data.forEach((item) => {
        //переьире=аем наш полус=ченнвый массив с обектами
        //добавляем а наш тег section  вёрсту карточек с данными их+з массива при каждом цыкле
        sectionBooks.innerHTML += `
        <div class="card mt-3" style="width: 20rem;">
        <img src="${item.bookImage}" class="card-img-top style="heigth:280px" alt="${item.bookName}">
         <div class="card-body">
        <h5 class="card-title">${item.bookName}</h5>
        <p class="card-text">${item.bookAuthor}</p>
        <p class="card-text">${item.bookPrice}</p>

        <button class="btn btn-outline-danger btnDelete" id="${item.id}">
        Удалить
        </button>
        <button class="btn btn-outline-warning btnEdit" 
        id="${item.id}"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Изменить
        </button>
        </div>
        </div>
        `;
      });
    });
}
readBooks(); //Один раз вызываем цукцию для отображение данных для того чтобы при первом пом=сещания сайта данные отрбразились
// ! ========= DELETE ========
// Событие на кнопку удалить
document.addEventListener("click", (event) => {
  // С помощю обекта event ищем класс нашего элемента
  let del_class = [...event.target.classList];
  // Сохроняем массив с классом в переменню использую spred оператор
  if (del_class.includes("btnDelete")) {
    // проаерчем есть ли а нашем поиске класс btn.Delete
    let del_id = event.target.id; // сохроняем в перемную id нашего элемента по котрому мы кликнули
    fetch(`${API}/${del_id}`, {
      method: "DELETE",
    }).then(() => readBooks()); // Для того чтобы вызов функции отображения данных подождал пока запрос Delete выполняется и затом сработал
  }
  console.log(del_class);
});

// ! ===== EDIT ========
// Сохроняем  в переменную названия инпутрв и кнопки
let editInpName = document.getElementById("editInpName");
let editInpAuthor = document.getElementById("editInpAuthor");
let editInpImage = document.getElementById("editInpImage");
let editInpPrice = document.getElementById("editInpPrice");
let editInpSave = document.getElementById("editInpSave");

document.addEventListener("click", (event) => {
  let editArr = [...event.target.classList];
  if (editArr.includes("btnEdit")) {
    let id = event.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editInpName.value = data.bookName;
        editInpAuthor.value = data.bookAuthor;
        editInpImage.value = data.bookImage;
        editInpPrice.value = data.bookPrice;
      });
  }
});
