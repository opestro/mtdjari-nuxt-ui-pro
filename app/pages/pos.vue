<template>

  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Point Of Sale">

      </UDashboardNavbar>
      <UDashboardSidebar>

          <UPageGrid>
            <UPageCard  >
              <UInput v-model:value="q" placeholder="Search..." />
            </UPageCard>
            <UPageCard >
              <UInput v-model:value="q" placeholder="Search..." />
            </UPageCard>
          </UPageGrid>
          <div >
            <UInput v-model:value="q" placeholder="Search..." />
          </div>
          <template #right  >

          </template>
      </UDashboardSidebar>
    </UDashboardPanel>
  </UDashboardPage>

</template>
<script setup>
const q = ref('')
const input = ref()
const products = {
  data: {
    length: 10
  }
}
</script>
