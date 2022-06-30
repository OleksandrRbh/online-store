import FiltersList from "../../filters-list/02-js-task/index.js";

const BACKEND_URL = 'https://online-store.bootcamp.place/api/'

export default class SideBar {
  constructor () {
    this.categoriesFilterData = []
    this.brandsFilterData = []

    this.categoriesUrl = new URL('categories', BACKEND_URL)
    this.brandsUrl = new URL('brands', BACKEND_URL)

    this.render()
    this.initFilters()
  }

  async initFilters () {
    await Promise.all([
      this.fetchCategoriesData(),
      this.fetchBrandsData()
    ])
    this.renderCategoriesFilter()
    this.renderBrandsFilter()
  }

  async fetchCategoriesData () {
    const response = await fetch(this.categoriesUrl);
    this.categoriesFilterData = await response.json();
  }

  async fetchBrandsData () {
    const response = await fetch(this.brandsUrl);
    this.brandsFilterData = await response.json();
  }

  async renderCategoriesFilter () {
    console.log('this.categoriesFilterData', this.categoriesFilterData)
    if (this.categoriesFilterData && this.categoriesFilterData.length) {
      const filter = new FiltersList({ name: 'Category', data: this.categoriesFilterData })
      const container = this.element.querySelector('[data-element="filters"]')
      container.appendChild(filter.element)
    }
  }

  async renderBrandsFilter () {
    console.log('this.brandsFilterData', this.brandsFilterData)
    if (this.brandsFilterData && this.brandsFilterData.length) {
      const filter = new FiltersList({ name: 'Brand', data: this.brandsFilterData })
      const container = this.element.querySelector('[data-element="filters"]')
      container.appendChild(filter.element)
    }
  }

  getTemplate () {
    return `
      <div class="os-sidebar">
        <div class="os-sidebar__filters" data-element="filters">
          <!-- filters -->
        </div>

        <!-- reset button -->
      </div>
    `
  }

  render () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.getTemplate()
    this.element = wrapper.firstElementChild
  }
}
