// Импорт необходимых функций из Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import {
	getDatabase,
	ref,
	set,
	get,
} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js'

// Конфигурация Firebase с ключами доступа к проекту
const firebaseConfig = {
	apiKey: 'AIzaSyACy_LuitVUjK8DAUeUqNlqxPSKq5-pHq8',
	authDomain: 'exam-e8645.firebaseapp.com',
	projectId: 'exam-e8645',
	storageBucket: 'exam-e8645.firebasestorage.app',
	messagingSenderId: '426407731862',
	appId: '1:426407731862:web:4a865a73787fe7e2e758b7',
}

// Инициализация Firebase приложения
const app = initializeApp(firebaseConfig)

// Получение ссылки на базу данных
const db = getDatabase(app)

/**
 * Добавление нового пользователя в базу данных
 * @param {string} login - логин пользователя
 * @param {string} password - пароль пользователя
 */
function addUser(login, password) {
	set(ref(db, 'user/' + login), {
		username: login,
		password: password,
	})
}

/**
 * Получение данных пользователя из базы данных
 * @param {string} login - логин пользователя
 * @returns {Promise} промис с данными пользователя
 */
function getUser(login) {
	return get(ref(db, 'user/' + login)).then(snapshot => snapshot.val())
}


/**
 * Создание модального окна для авторизации/регистрации
 * @param {string} title - заголовок окна
 * @param {number} btnIndex - индекс кнопки (1 - регистрация, 2 - вход)
 */
function modalWin(title, btnIndex) {
	// Создание элементов модального окна
	let modalH1 = document.createElement('h1')
	modalH1.innerText = title

	let modalWin = document.createElement('div')
	modalWin.className = 'modal-window'
	let modalDiv = document.createElement('div')
	modalDiv.className = 'modal'

	// Создание полей ввода
	let nameInput = document.createElement('input')
	nameInput.id = 'loginInp'
	nameInput.type = 'text'
	nameInput.placeholder = 'Enter your name'

	let passwordInput = document.createElement('input')
	passwordInput.id = 'password'
	passwordInput.type = 'text'
	passwordInput.placeholder = 'Enter your password'

	// Создание кнопки подтверждения
	let buttonOk = document.createElement('button')
	buttonOk.innerText = 'OK'
	buttonOk.id = 'okBtn'

	// Сборка структуры модального окна
	modalDiv.appendChild(modalH1)
	modalDiv.appendChild(nameInput)
	modalDiv.appendChild(passwordInput)
	modalWin.appendChild(modalDiv)
	document.body.appendChild(modalWin)

	// Создание кнопки закрытия
	let closeButton = document.createElement('button')
	closeButton.innerText = 'Close'
	closeButton.onclick = () => {
		modalWin.remove()
	}

	// Создание обертки для кнопок
	let btnWrapper = document.createElement('div')
	btnWrapper.className = 'btn-wrapper'
	btnWrapper.appendChild(closeButton)
	btnWrapper.appendChild(buttonOk)
	modalDiv.appendChild(btnWrapper)

	// Обработчик нажатия кнопки OK
	buttonOk.onclick = () => {
		let loginVal = document.getElementById('loginInp').value
		let password = document.getElementById('password').value

		// Логика регистрации
		if (btnIndex == 1) {
			if (loginVal == '' || password == '') {
				alert('Please fill in all fields')
				return
			} else {
				addUser(loginVal, password)
				sessionStorage.setItem('login', loginVal)
				sessionStorage.setItem('password', password)
				location.href = 'passwordGenerator.html'
			}
		}
		// Логика входа
		if (btnIndex == 2) {
			getUser(loginVal)
				.then(user => {
					if (user && user.password === password) {
						alert('Login successful')
						sessionStorage.setItem('login', loginVal)
						sessionStorage.setItem('password', password)
						location.href = 'passwordGenerator.html'
					} else {
						alert(
							'Просим Вас зарегистрироваться, перед использованием программы'
						)
					}
				})
				.catch(error => {
					console.error('Error getting user:', error)
				})
		}
	}
}

// Получение кнопок входа и регистрации
let login = document.getElementById('login')
let signUp = document.getElementById('signup')

// Обработчики нажатия на кнопки
login.onclick = () => {
	modalWin('login', 1)
}

signUp.onclick = () => {
	modalWin('sign up', 2)
}
