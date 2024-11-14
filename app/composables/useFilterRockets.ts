import { computed, ref, type Ref } from 'vue'

export default function useFilterRockets(rockets: Ref<any[]>) {
	const selectedYear = ref<string | null>('All')
	const selectedSortOrder = ref<string>('Ascending')

	const yearOptions = computed(() => {
		const years = Array.from(
			new Set(rockets.value.map((rocket) => new Date(rocket.first_flight).getFullYear().toString())),
		)
		return ['All', ...years.sort((a, b) => parseInt(b) - parseInt(a))]
	})

	const filteredRockets = computed(() => {
		let filtered = rockets.value

		if (selectedYear.value !== 'All' && selectedYear.value !== null) {
			filtered = filtered.filter(
				(rocket) => new Date(rocket.first_flight).getFullYear().toString() === selectedYear.value,
			)
		}

		return [...filtered].sort((a, b) => {
			const dateA = new Date(a.first_flight).getTime()
			const dateB = new Date(b.first_flight).getTime()
			return selectedSortOrder.value === 'Ascending' ? dateA - dateB : dateB - dateA
		})
	})

	return {
		selectedYear,
		selectedSortOrder,
		filteredRockets,
		yearOptions,
	}
}
