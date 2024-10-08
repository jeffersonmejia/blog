const d = document,
	$nav = d.querySelector('nav'),
	$logo = d.querySelector('.logo-nav'),
	$categories = d.querySelectorAll('.category small'),
	$categoryFilter = d.querySelector('.projects-filter-content'),
	$projects = d.querySelectorAll('.article-ancle'),
	$contactMeSection = d.querySelector('footer')

const categoriesColor = {
	['javascript']: {
		background: 'rgb(177, 177, 0)',
		color: 'rgb(0,0,0)',
	},
	['desarrollo web']: {
		background: 'rgb(7, 85, 48)',
		color: 'rgb(67,255,166)',
	},
	['frontend']: {
		background: 'rgb(0 93 126)',
		color: 'rgb(84 210 255)',
	},
	['typescript']: {
		background: 'rgb(49 120 198)',
		color: 'rgb(255,255,255)',
	},
}
const categoriesName = Object.keys(categoriesColor)

function setCategoryColor() {
	const DEFAULT_COLOR = 'rgb(255,255,255)',
		DEFAULT_BG = 'rgb(16,16,16)'
	$categories.forEach((category) => {
		let name = category.textContent
		name = name.toLocaleLowerCase()

		const color = categoriesColor[name]?.color,
			bg = categoriesColor[name]?.background

		category.style.color = color || DEFAULT_COLOR
		category.style.backgroundColor = bg || DEFAULT_BG
	})
}

function toggleLogo() {
	const y = window.scrollY
	if (y >= 65) {
		$logo.classList.remove('hidden')
		if (!$nav.classList.contains('nav-fixed')) {
			$nav.style.opacity = 0
			setTimeout(() => {
				$nav.style.opacity = 1
				$nav.classList.add('nav-fixed')
			}, 300)
		}
	} else {
		$logo.classList.add('hidden')
		$nav.classList.remove('nav-fixed')
	}
}

function getFilterByCategory() {
	const $fragment = d.createDocumentFragment(),
		$clearFilter = d.createElement('li')

	$clearFilter.textContent = 'Limpiar'
	$clearFilter.classList.add('clear-filter')

	categoriesName.forEach((category) => {
		const $category = d.createElement('li')
		const { background, color } = categoriesColor[category]

		const words = category.split(' ')
		const capitalizedWords = words.map((word) => {
			let first = word.charAt(0),
				second = word.slice(1)
			joined = ''
			if (word !== 'de') {
				first = first.toUpperCase()
				second = second.toLocaleLowerCase()
			}

			joined = `${first}${second}`

			return joined
		})
		category = capitalizedWords.join(' ')

		$category.textContent = category
		$category.style.backgroundColor = background
		$category.style.color = color
		$category.classList.add('no-select')
		$fragment.appendChild($category)
	})
	$categoryFilter.appendChild($fragment)
	$categoryFilter.appendChild($clearFilter)
}
function filterProjectsByCategory(category) {
	const TRANSITION_TIME = 200
	let projects = Array.from($projects)

	if (category === 'Limpiar') {
		projects.forEach((project) => {
			project.classList.remove('hidden')
			setTimeout(() => {
				project.style.opacity = 1
			}, TRANSITION_TIME)
		})
	} else {
		projects.forEach((project) => {
			const categories = getCategoriesProject(project)
			let hasCategory = false
			for (let i = 0; i < categories.length; i++) {
				if (hasCategory) break
				const projectCategory = categories[i]
				category = category.toLowerCase()
				hasCategory = projectCategory === category
			}
			if (!hasCategory) {
				project.style.opacity = 0
				project.classList.add('hidden')
			} else {
				project.classList.remove('hidden')
				setTimeout(() => {
					project.style.opacity = 1
				}, TRANSITION_TIME)
			}
		})
	}
	$categoryFilter.classList.add('hidden')
}

function getCategoriesProject(project) {
	let projectCategories = project.querySelectorAll('.category small')
	projectCategories = Array.from(projectCategories)

	const categoriesName = projectCategories.map((el) => {
		return el.textContent.toLowerCase()
	})
	return categoriesName
}

function scrollContactMe() {
	const $highlightItems = $contactMeSection.querySelectorAll('a')

	$contactMeSection.scrollIntoView({ behavior: 'smooth' })

	setTimeout(() => {
		$highlightItems.forEach((el, index) => {
			if (index > 0) el.style.color = 'white'
		})
	}, 1000)
	setTimeout(() => {
		$highlightItems.forEach((el) => {
			el.style.color = 'var(--text-color-gray)'
		})
	}, 2000)
}
d.addEventListener('DOMContentLoaded', (e) => {
	setCategoryColor()
	getFilterByCategory()
})
d.addEventListener('scroll', (e) => {
	if (window.innerWidth > 800) {
		toggleLogo()
	}
})

d.addEventListener('click', (e) => {
	if (e.target.matches('.projects-filter-container button')) {
		$categoryFilter.classList.toggle('hidden')
	}
	if (e.target.matches('.projects-filter-content li')) {
		const category = e.target.textContent
		filterProjectsByCategory(category)
	}
	if (e.target.matches('.contact-me-ancle')) {
		scrollContactMe()
	}
})
