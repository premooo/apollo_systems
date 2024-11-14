import { computed, ref, type Ref } from 'vue'

export default function useFilterLaunches(launches: Ref<any[]>) {
	const selectedYear = ref<string | null>('All')
	const selectedSortOrder = ref<string>('Ascending')

	const yearsWithAllOption = computed(() => {
		const years = Array.from(
			new Set(
				launches.value.map((launch) => new Date(launch.launch_date_utc).getFullYear().toString()),
			),
		)
		return ['All', ...years.sort((a, b) => parseInt(b) - parseInt(a))]
	})

	const filteredLaunches = computed(() => {
		let filtered = launches.value

		if (selectedYear.value !== 'All' && selectedYear.value !== null) {
			filtered = filtered.filter(
				(launch) => new Date(launch.launch_date_utc).getFullYear().toString() === selectedYear.value,
			)
		}

		return [...filtered].sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()
			return selectedSortOrder.value === 'Ascending' ? dateA - dateB : dateB - dateA
		})
	})

	return {
		selectedYear,
		selectedSortOrder,
		yearsWithAllOption,
		filteredLaunches,
	}
}
