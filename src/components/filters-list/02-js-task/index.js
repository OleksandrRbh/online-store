import toSnakeCase from "../../../helpers/toSnakeCase.js";

export default class FiltersList {
  constructor ({ name = 'Filter name', data = [] }) {
    this.filterName = name
    this.filterData = data

    this.render()
    this.renderFilterItems()
    this.addListeners()
  }

  getTemplate () {
    return `
      <form class="os-filter">
        <h3 class="os-filter__title">${this.filterName}</h3>
        <ul class="os-filter__list" data-element="filterList">
          <!-- Filter items -->
        </ul>
        <button>Reset</button>
      </form>
    `
  }

  render () {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.getTemplate()
    this.element = wrapper.firstElementChild
  }

  renderFilterItems () {
    const filterItems = this.filterData.map(item => {
      const filterItem = document.createElement('div')
      filterItem.innerHTML = `
        <li class="os-filter__item">
          <input
            class="os-filter__input"
            id="${this.filterName}=${toSnakeCase(item)}"
            type="checkbox"
            name="filter"
            value="${this.filterName}=${toSnakeCase(item)}"
          >
          <label class="os-filter__label" for="${this.filterName}=${toSnakeCase(item)}">${item}</label>
        </li>
      `
      return filterItem.firstElementChild
    })

    const list = this.element.querySelector('[data-element="filterList"]')
    list.innerHTML = ''
    list.append(...filterItems)
  }

  addListeners () {
    this.element.addEventListener('submit', event => {
      event.preventDefault()
    })
    this.element.addEventListener('change', event => {
      this.dispatchPageChangeEvent({ filter: event.target.value, isActive: event.target.checked })
    })
  }

  dispatchPageChangeEvent (payload) {
    const customEvent = new CustomEvent('filter-changed', {
      detail: payload
    })
    this.element.dispatchEvent(customEvent)
  }
}
