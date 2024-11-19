<script setup >

const { find } = useStrapi()


const defaultColumns = [{
  key: 'image',
  label: 'Image'
}, {
  key: 'name',
  label: 'Name',
  sortable: true
}, {
  key: 'price',
  label: 'Price/Quantity'
}, {
  key: 'sales',
  label: 'Sales',
  sortable: true
}, {
  key: 'action',
  label: 'Action'
}]

const q = ref('')
const selected = ref([])
const selectedColumns = ref(defaultColumns)
const selectedStatuses = ref([])
const selectedLocations = ref([])
const sort = ref({ column: 'id', direction: 'asc'  })
const input = ref()
const isNewUserModalOpen = ref(false)

const columns = computed(() => defaultColumns.filter(column => selectedColumns.value.includes(column)))

// const query = computed(() => ({ q: q.value, statuses: selectedStatuses.value, locations: selectedLocations.value, sort: sort.value.column, order: sort.value.direction }))


const products = await findOne('products',{
    populate: {
        images: true,
    }
})
// console.log(response)
// const defaultLocations = users.value.reduce((acc, user) => {
//   if (!acc.includes(user.location)) {
//     acc.push(user.location)
//   }
//   return acc
// }, [] as string[])

// const defaultStatuses = users.value.reduce((acc, user) => {
//   if (!acc.includes(user.status)) {
//     acc.push(user.status)
//   }
//   return acc
// }, [] as string[])

// function onSelect(row: User) {
//   const index = selected.value.findIndex(item => item.id === row.id)
//   if (index === -1) {
//     selected.value.push(row)
//   } else {
//     selected.value.splice(index, 1)
//   }
// }

defineShortcuts({
  '/': () => {
    input.value?.input?.focus()
  }
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar
        title="Users"
        :badge="products.data.length"
      >
        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter users..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>

          <UButton
            label="New user"
            trailing-icon="i-heroicons-plus"
            color="gray"
            @click="isNewUserModalOpen = true"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu
            v-model="selectedStatuses"
            icon="i-heroicons-check-circle"
            placeholder="Status"
            multiple
            :options="defaultStatuses"
            :ui-menu="{ option: { base: 'capitalize' } }"
          />
          <USelectMenu
            v-model="selectedLocations"
            icon="i-heroicons-map-pin"
            placeholder="Location"
            :options="defaultLocations"
            multiple
          />
        </template>

        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
            class="hidden lg:block"
          >
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>

      <UDashboardModal
        v-model="isNewUserModalOpen"
        title="New user"
        description="Add a new user to your database"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <!-- ~/components/products/ProductsForm.vue -->
        <ProductsForm @close="isNewUserModalOpen = false" />
      </UDashboardModal>

      <UTable
        v-model="selected"
        v-model:sort="sort"
        :rows="products.data"
        :columns="columns"
        :loading="pending"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @select="onSelect"
      >
        <template #name-data="{ row }">
          <div class="flex items-center gap-3">
            <UAvatar
              v-bind="row.avatar"
              :alt="row.name"
              size="xs"
            />

            <span class="text-gray-900 dark:text-white font-medium">{{ row.name }}</span>
          </div>
        </template>

        <!-- <template #status-data="{ row }">
          <UBadge
            :label="row.action"
            variant="subtle"
            class="capitalize"
          />
        </template> -->
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
