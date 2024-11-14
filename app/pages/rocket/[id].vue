<template>
  <v-container class="pa-5">
    <v-row class="mb-5">
      <v-col cols="12">
        <v-typography variant="h4" class="text-center font-weight-bold">
          Rocket Details
        </v-typography>
      </v-col>
    </v-row>

    <!-- Loading state with spinner -->
    <v-row v-if="loading" class="justify-center">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <!-- Error state with retry option -->
    <v-row v-if="error" class="justify-center">
      <v-col cols="auto">
        <v-alert type="error" dismissible>
          <v-icon left>mdi-alert-circle-outline</v-icon>
          Error loading rocket details. Please try again later.
          <v-btn @click="retryFetch">Retry</v-btn>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Rocket details card -->
    <v-row v-if="rocket" class="justify-center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <v-typography variant="h5" class="font-weight-bold">{{ rocket.name }}</v-typography>
          </v-card-title>
          <v-card-subtitle class="font-weight-medium">{{ rocket.type || 'Unknown Type' }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <p><strong>First Flight:</strong> {{ rocket.first_flight || 'N/A' }}</p>
                <p><strong>Height:</strong> {{ rocket.height?.meters || 'N/A' }} meters</p>
              </v-col>
              <v-col cols="12" md="6">
                <p><strong>Diameter:</strong> {{ rocket.diameter?.meters || 'N/A' }} meters</p>
                <p><strong>Mass:</strong> {{ rocket.mass?.lb || 'N/A' }} lbs</p>
              </v-col>
            </v-row>
            <v-divider class="my-4" />
            <p><strong>Description:</strong></p>
            <v-alert v-if="rocket.description" type="info">
              {{ rocket.description }}
            </v-alert>
            <v-alert v-else type="info">
              No description available.
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import gql from 'graphql-tag';
import { useQuery } from '@vue/apollo-composable';

export default defineComponent({
  setup() {
    const route = useRoute();
    const rocketId = route.params.id;

    // Apollo query to get rocket details
    const rocketQuery = gql`
      query getRocketDetails($id: ID!) {
        rocket(id: $id) {
          id
          name
          description
          type
          first_flight
          height {
            meters
          }
          diameter {
            meters
          }
          mass {
            lb
          }
        }
      }
    `;

    const { result, loading, error, refetch } = useQuery(rocketQuery, { id: rocketId });

    const rocket = ref<any>(null);

    watch(
      () => result.value,
      (newResult) => {
        if (newResult) {
          rocket.value = newResult.rocket;
        }
      },
      { immediate: true }
    );

    const retryFetch = () => {
      refetch();
    };

    return {
      rocket,
      loading,
      error,
      retryFetch,
    };
  },
});
</script>

<style scoped>
.v-typography {
  text-align: center;
}

.v-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.v-alert {
  margin-top: 20px;
}

.v-progress-circular {
  margin: 20px;
}
</style>
