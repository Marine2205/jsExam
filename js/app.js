// Получаем элементы управления из DOM
let slider = document.getElementById('slider')
let lengthParagraph = document.getElementById('len')

// Получаем чекбоксы для настроек пароля
let checkboxUpperCase = document.getElementById('isUpperCase')
let checkboxNumbers = document.getElementById('isNumbers')
let checkboxSpecialChars = document.getElementById('isSpecialChars')

// Состояния чекбоксов
let isUpperCase = false
let isNumbers = false
let isSpecialChars = false

// Кнопка генерации и элемент для отображения пароля
let generateButton = document.getElementById('generateButton')
let passwordDiv = document.getElementById('password')

// Кнопка копирования
let copy = document.getElementById('copy')

// Обработчик загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
	// Проверка наличия пароля в сессии, если нет - редирект на главную
	if (sessionStorage.getItem('password') == undefined) {
		location.href = '../index.html'
	}

	// Инициализация отображения длины пароля
	lengthParagraph.innerText = slider.value + ' символов'
	// Скрываем пароль и кнопку копирования при загрузке
	passwordDiv.style.visibility = 'hidden'
	copy.style.visibility = 'hidden'
})

/**
 * Генерация пароля с заданными параметрами
 * @param {number} length - Длина пароля
 * @param {boolean} isUpperCase - Включать ли заглавные буквы
 * @param {boolean} isNumbers - Включать ли цифры
 * @param {boolean} isSpecialChars - Включать ли спецсимволы
 * @returns {string} Сгенерированный пароль
 */
function generatePassword(length, isUpperCase, isNumbers, isSpecialChars) {
	// Наборы символов для генерации
	let characters = 'abcdefghijklmnopqrstuvwxyz'
	let numbers = '0123456789'
	let specialChars = '!@#$%^&*()'

	let password = ''

	// Добавляем нужное количество цифр (четверть длины пароля)
	if (isNumbers) {
		let numbersCount = Math.floor(length / 4)
		for (let i = 0; i < numbersCount; i++) {
			password += numbers.charAt(Math.floor(Math.random() * numbers.length))
		}
	}

	// Добавляем спецсимволы (четверть длины пароля)
	if (isSpecialChars) {
		let specialCount = Math.floor(length / 4)
		for (let i = 0; i < specialCount; i++) {
			password += specialChars.charAt(
				Math.floor(Math.random() * specialChars.length)
			)
		}
	}

	// Добавляем заглавные буквы (четверть длины пароля)
	if (isUpperCase) {
		let upperCount = Math.floor(length / 4)
		for (let i = 0; i < upperCount; i++) {
			password += characters
				.toUpperCase()
				.charAt(Math.floor(Math.random() * characters.length))
		}
	}

	// Добавляем строчные буквы до достижения нужной длины
	while (password.length < length) {
		password += characters.charAt(Math.floor(Math.random() * characters.length))
	}

	// Перемешиваем символы в пароле случайным образом
	return password
		.split('')
		.sort(() => Math.random() - 0.5)
		.join('')
}

// Обработчик клика по кнопке генерации
generateButton.onclick = () => {
	// Показываем кнопку копирования и поле с паролем
	copy.style.visibility = 'visible'
	passwordDiv.style.visibility = 'visible'
	// Генерируем и отображаем пароль
	let password = generatePassword(
		slider.value,
		isUpperCase,
		isNumbers,
		isSpecialChars
	)
	passwordDiv.innerText = password
}

// Обновление отображения длины пароля при изменении слайдера
slider.oninput = () => {
	lengthParagraph.innerText = slider.value + ' символов'
}

// Обработчики изменения состояния чекбоксов
checkboxUpperCase.onchange = () => {
	isUpperCase = !isUpperCase
}

checkboxNumbers.onchange = () => {
	isNumbers = !isNumbers
}

checkboxSpecialChars.onchange = () => {
	isSpecialChars = !isSpecialChars
}

// Обработчик копирования пароля
copy.onclick = () => {
	navigator.clipboard
		.writeText(passwordDiv.innerText)
		.then(() => alert('Пароль скопирован в буфер обмена'))
		.catch(err => console.error(err))
}
