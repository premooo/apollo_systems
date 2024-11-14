<template>
  <v-container>
    <h3 class="my-5">
      Rockets
      <v-chip color="blue">Rocket Details</v-chip>
      <v-chip color="orange">Data from SpaceX GraphQL</v-chip>
    </h3>
    <p class="mb-4">There are {{ rockets?.length || 0 }} rockets.</p>
    <v-table class="rocket-table">
      <thead>
        <tr>
          <th class="text-left">Rocket Name</th>
          <th class="text-left">Description</th>
          <th class="text-left">First Flight</th>
          <th class="text-left">Height (m)</th>
          <th class="text-left">Diameter (m)</th>
          <th class="text-left">Mass (kg)</th>
          <th class="text-left">Number of Stages</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rocket in rockets" :key="rocket.name">
          <td>{{ rocket.name }}</td>
          <td>{{ rocket.description || 'No description available' }}</td>
          <td>{{ new Date(rocket.first_flight).toLocaleDateString() || 'N/A' }}</td>
          <td>{{ rocket.height?.meters || 'N/A' }}</td>
          <td>{{ rocket.diameter?.meters || 'N/A' }}</td>
          <td>{{ rocket.mass?.kg || 'N/A' }}</td>
          <td>{{ rocket.stages || 'N/A' }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>


  
<script lang="ts" setup>
import gql from 'graphql-tag';

const query = gql`
  query getRockets {
    rockets {
      id
      name
      description
      first_flight
      height {
        meters
      }
      diameter {
        meters
      }
      mass {
        kg
      }
      stages
    }
  }
`;

const { data } = useAsyncQuery<{
  rockets: {
    id: string;
    name: string;
    description: string;
    first_flight: string;
    height: { meters: number };
    diameter: { meters: number };
    mass: { kg: number };
    stages: number;
  }[];
}>(query);

const rockets = computed(() => data.value?.rockets ?? []);
</script>


<style scoped>
.rocket-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.rocket-table th, .rocket-table td {
  padding: 12px;
  text-align: left;
}

.rocket-table th {
  background-color: gray;
  color: white;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
}

.rocket-table td {
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

.rocket-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.rocket-table tr:hover {
  background-color: #e3f2fd;
  transition: background-color 0.2s ease-in-out;
}

.rocket-table td {
  font-size: 14px;
}

.rocket-table td:first-child {
  font-weight: 500;
}

.rocket-table td:nth-child(2) {
  max-width: 300px;
  word-wrap: break-word;
}
</style>
