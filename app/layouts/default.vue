<template>
	<v-app>
		<AppHeader />
		<v-main>
			<slot />
		</v-main>
		<AppFooter />
	</v-app>
</template>

<script>
import AppFooter from '~/composables/inc/appFooter.vue'
import AppHeader from '~/composables/inc/AppHeader.vue'

export default {
	name: 'DefaultLayout',
	components: {
		AppHeader,
		AppFooter,
	},
}
</script>
