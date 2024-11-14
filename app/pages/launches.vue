<template>
  <v-container>
    <v-row class="my-2 align-center">
      <h3>SpaceX Launches</h3>
      <v-chip color="blue" class="mx-1">Launch List</v-chip>
      <v-chip color="orange" class="mx-1">Data from SpaceX GraphQL</v-chip>
    </v-row>

    <v-row class="mb-2">
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedYear"
          :items="yearsWithAllOption"
          label="Filter by Year"
          outlined
          dense
        />
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedSortOrder"
          :items="['Ascending', 'Descending']"
          label="Sort by Launch Date"
          outlined
          dense
        />
      </v-col>
    </v-row>

    <p>There are {{ filteredLaunches?.length || 0 }} launches.</p>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Mission Name</th>
          <th class="text-left" style="width: 200px;">Launch Date</th>
          <th class="text-left">Launch Site</th>
          <th class="text-left">Rocket Name</th>
          <th class="text-left">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="launch in paginatedLaunches" :key="launch.id">
          <td>{{ launch.mission_name || 'N/A' }}</td>
          <td>{{ new Date(launch.launch_date_utc).toLocaleDateString() }}</td>
          <td>{{ launch.launch_site?.site_name_long || 'N/A' }}</td>
          <td>
            <nuxt-link :to="`/rocket/${rocketIdMap[launch.rocket.rocket_name]}`">
              {{ launch.rocket.rocket_name }}
            </nuxt-link>
          </td>
          <td>{{ launch.details || 'No Description Available' }}</td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination Controls -->
    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      :total-visible="10"
      class="mt-4"
    />
  </v-container>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import useFilterLaunches from '../composables/useFilterLaunches';
import gql from 'graphql-tag';

export default defineComponent({
  setup() {
    const launchesQuery = gql`
      query getLaunches($limit: Int) {
        launches(limit: $limit) {
          id
          mission_name
          launch_date_utc
          launch_site {
            site_name_long
          }
          rocket {
            rocket_name
          }
          details
        }
      }
    `;

    const rocketsQuery = gql`
      query Query {
        rockets {
          id
          name
        }
      }
    `;
    const { data: launchesData } = useAsyncQuery<{
      launches: {
        id: string;
        mission_name: string;
        launch_date_utc: string;
        launch_site: { site_name_long: string };
        rocket: { rocket_name: string };
        details: string;
      }[];
    }>(launchesQuery);

    const { data: rocketsData } = useAsyncQuery<{
      rockets: {
        id: string;
        name: string;
      }[];
    }>(rocketsQuery);

    const launches = computed(() => {
      return launchesData.value?.launches ?? [];
    });

    const rocketIdMap = computed(() => {
      const map: { [key: string]: string } = {};
      rocketsData.value?.rockets.forEach((rocket) => {
        map[rocket.name] = rocket.id;
      });
      return map;
    });

    const { selectedYear, selectedSortOrder, yearsWithAllOption, filteredLaunches } = useFilterLaunches(launches);

    // Pagination logic
    const perPage = 10; 
    const currentPage = ref(1);

  
    const totalPages = computed(() => {
      return Math.ceil(filteredLaunches.value.length / perPage);
    });

    const paginatedLaunches = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return filteredLaunches.value.slice(start, end);
    });

    watch(launches, (newLaunches) => {
      if (newLaunches.length > 0) {
        selectedYear.value = 'All';
      }
    }, { immediate: true });

    return {
      launches,
      selectedYear,
      selectedSortOrder,
      yearsWithAllOption,
      filteredLaunches,
      rocketIdMap,
      currentPage,
      totalPages,
      paginatedLaunches,
    };
  },
});
</script>


  <style>
     table {
          width: 80%;
          border-collapse: collapse;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
  
      th, td {
          padding: 16px;
          text-align: left;
      }
  
      th {
          background-color: #f9fafb;
          color: #4b5563;
          font-weight: bold;
          border-bottom: 2px solid #e5e7eb;
      }
  
      tr:nth-child(even) {
          background-color: #f9fafb;
      }
  
      tr:hover {
          background-color: #e5e7eb;
          transition: background-color 0.2s;
      }
  
      td {
          color: #374151;
      }
  </style>
  
  