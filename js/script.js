const todos = [];
const RENDER_EVENT = 'render-todo';
// Berikut adalah penjelasan kode diatas. 

//     Variabel todos adalah sebuah variabel berisi array yang akan menampung beberapa object. Object ini berisikan data-data Todo user. 

//     Variabel RENDER_EVENT bertujuan untuk mendefinisikan Custom Event dengan nama 'render-todo'. Custom event ini digunakan sebagai patokan dasar ketika ada perubahan data pada variabel todos, seperti perpindahan todo (dari incomplete menjadi complete, dan sebaliknya), menambah todo, maupun menghapus todo. 

document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTodo();
    });
});
// Kode di atas adalah sebuah listener yang akan menjalankan kode yang ada didalamnya ketika event DOMContentLoaded dibangkitkan alias ketika semua elemen HTML sudah dimuat menjadi DOM dengan baik.

// Ketika semua elemen sudah dimuat dengan baik, maka kita perlu mempersiapkan elemen form untuk menangani event submit, di mana aksi tersebut dibungkus dan dijalankan oleh fungsi addTodo(), untuk menambahkan todo baru.

// Akan tetapi, elemen form secara default akan memuat ulang secara otomatis website ketika submit. Karena pada latihan ini kita akan menyimpan data dalam memory dan data tersebut akan hilang ketika dimuat ulang, kita perlu memanggil method preventDefault() yang didapatkan dari object event. Dengan demikian, data yang disimpan dalam memory akan terjaga dengan baik.

function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;
    const generateID = generateId();
    const todoObject = generateTodoObject(generateID, textTodo, timestamp, false);
    todos.push(todoObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
}
// Kode document.getElementById("title").value berfungsi untuk mengambil elemen pada html. Dalam kasus tersebut, kita menangkap element <input> dengan id title dan memanggil properti value untuk mendapatkan nilai yang diinputkan oleh user. Logika yang sama juga dilakukan pada input date.

// Setelah nilai input user disimpan dalam variabel textTodo dan timestamp, kita akan membuat sebuah object dari todo dengan memanggil helper generateTodoObject() untuk membuat object baru. Kemudian, object tersebut disimpan pada array todos menggunakan metode push().

// Setelah disimpan pada array, kita panggil sebuah custom event RENDER_EVENT menggunakan method dispatchEvent(). Custom event ini akan kita terapkan untuk me-render data yang telah disimpan pada array todos.

// Oke, fungsi addTodo() sudah selesai dibuat. Mungkin Anda bingung dan bertanya-tanya mengapa terjadi error pada kode yang dituliskan sebelumnya. Hal tersebut dikarenakan terdapat beberapa fungsi dan variabel yang belum dideklarasikan (dibuat), yaitu generateId() dan generateTodoObject() dan variabel todos & RENDER_EVENT.

// Sebelum menuliskan dua fungsi vital tersebut, mari kita coba pahami dahulu mengenai data dan strukturnya yang akan digunakan. Dari segi struktur data, secara garis besar sudah bisa dilihat pada pemanggilan fungsi generateTodoObject() yang telah Anda tulis tadi.

// generateTodoObject(generatedID, textTodo, timestamp, false);

// Di sini bisa terlihat bahwa data yang akan kita gunakan adalah id, textTodo, timestamp, & state. Yang mana, apabila disusun dalam bentuk skema data, dan menyesuaikan dengan data yang dibutuhkan oleh aplikasi todo apps akan menjadi seperti berikut.

//     {
//       id: "string",
//       task: "string",
//       timestamp: "string",
//       isCompleted: "boolean"
//     }

function generateId() {
    return + new Date();
}

function generateTodoObject(id, task, timestamp, isCompleted) {
    return {
        id,
        task,
        timestamp,
        isCompleted
    }
}
// Berikut adalah penjelasan kode diatas: 

//     Fungsi generateId() berfungsi untuk menghasilkan identitas unik pada setiap item todo. Untuk menghasilkan identitas yang unik, kita manfaatkan +new Date() untuk mendapatkan timestamp pada JavaScript.

//     Fungsi generateTodoObject() berfungsi untuk membuat object baru dari data yang sudah disediakan dari inputan (parameter function), diantaranya id, nama todo (task), waktu (timestamp), dan isCompleted (penanda todo apakah sudah selesai atau belum).

document.addEventListener(RENDER_EVENT, function() {
    console.log(todos);
});