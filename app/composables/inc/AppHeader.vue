<template>
	<nav class="navbar">
		<div class="navbar-container">
			<a href="/" class="logo">SpaceX</a>

			<div class="navbar-links">
				<a href="/" class="navbar-link">Ships</a>
				<a href="/launches" class="navbar-link">Launches</a>
				<a href="/rockets" class="navbar-link">Rockets</a>
			</div>

			<div class="hamburger" @click="toggleMenu">
				<span class="hamburger-line" />
				<span class="hamburger-line" />
				<span class="hamburger-line" />
			</div>
		</div>

		<div v-if="isMenuOpen" class="mobile-links">
			<a href="/" class="navbar-link">Ships</a>
			<a href="/launches" class="navbar-link">Launches</a>
			<a href="/rockets" class="navbar-link">Rockets</a>
		</div>
	</nav>
</template>

<script>
export default {
	data() {
		return {
			isMenuOpen: false,
		}
	},
	methods: {
		toggleMenu() {
			this.isMenuOpen = !this.isMenuOpen
		},
	},
}
</script>

<style scoped>
/* Navbar styles */
.navbar {
	background-color: #333;
	padding: 10px 20px;
}

.navbar-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.logo {
	color: white;
	font-size: 24px;
	font-weight: bold;
	text-decoration: none;
}

.navbar-links {
	display: flex;
	gap: 20px;
}

.navbar-link {
	color: white;
	text-decoration: none;
	font-size: 16px;
	transition: color 0.3s;
}

.navbar-link:hover {
	color: #ff9800;
}

/* Mobile Hamburger Menu */
.hamburger {
	display: none;
	flex-direction: column;
	gap: 5px;
	cursor: pointer;
}

.hamburger-line {
	width: 25px;
	height: 3px;
	background-color: white;
}

/* Mobile Menu */
.mobile-links {
	display: block;
	background-color: #333;
	padding: 20px;
	position: absolute;
	top: 60px;
	right: 20px;
	width: 200px;
	border-radius: 8px;
}

.mobile-link {
	display: block;
	color: white;
	text-decoration: none;
	padding: 10px 0;
	font-size: 16px;
	text-align: center;
}

.mobile-link:hover {
	color: #ff9800;
}

/* Media Queries */
@media screen and (width <= 768px) {
	.navbar-links {
		display: none;
	}

	.hamburger {
		display: flex;
	}
}
</style>
