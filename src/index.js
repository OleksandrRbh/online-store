import CardsList from "./components/cards-list/02-js-task/index.js";
import Pagination from './components/pagination/02-js-task/index.js'

const BACKEND_URL = 'https://online-store.bootcamp.place/api/'

export default class OnlineStorePage {
  constructor () {
    this.pageSize = 9
    this.components = {}
    this.products = []

    this.url = new URL('products', BACKEND_URL)
    this.url.searchParams.set('_limit', this.pageSize)

    this.initComponents()
    this.render()
    this.renderComponents()
    this.initEventListeners()

    this.update(1)
    console.log('this', this)
  }

  async loadData (pageNumber) {
    this.url.searchParams.set('_page', pageNumber)
    const response = await fetch(this.url);
    const products = await response.json();
    return products;
  }

  getTemplate () {
    return `
      <div class="page">
        <div data-element="cardsList">
          <!-- Cards List component -->
        </div>
        <div data-element="pagination">
          <!-- Pagination component -->
        </div>
      </div>
    `
  }

  initComponents () {
    const totalElements = 100
    const totalPages = Math.ceil(totalElements / this.pageSize)

    const cardsList = new CardsList(this.products)
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages
    })

    this.components.cardsList = cardsList
    this.components.pagination = pagination
  }

  render () {
    const wrapper = document.createElement('div')

    wrapper.innerHTML = this.getTemplate()

    this.element = wrapper.firstElementChild
  }

  renderComponents () {
    const cardsContainer = this.element.querySelector('[data-element="cardsList"]')
    const paginationContainer = this.element.querySelector('[data-element="pagination"]')

    cardsContainer.append(this.components.cardsList.element)
    paginationContainer.append(this.components.pagination.element)
  }

  initEventListeners () {
    this.components.pagination.element.addEventListener('page-changed', event => {
      const pageIndex = Number(event.detail)

      this.update(pageIndex + 1)
    })
  }

  async update (pageNumber) {
    const data = await this.loadData(pageNumber)

    this.components.cardsList.update(data)
  }
}















