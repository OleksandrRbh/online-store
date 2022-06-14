import CardsList from "./components/cards-list/02-js-task/index.js";
import Pagination from './components/pagination/02-js-task/index.js'

export default class OnlineStorePage {
  constructor (products = []) {
    this.pageSize = 3
    this.products = products
    this.components = {}

    this.initComponents()
    this.render()
    this.renderComponents()

    this.initEventListeners()
    console.log('this', this)
  }

  getTemplate () {
    return `
      <div>
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
    const totalPages = Math.ceil(this.products.length / this.pageSize)

    const cardsList = new CardsList(this.products.slice(0, this.pageSize))
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

      const start = this.pageSize * pageIndex
      const end = start + this.pageSize
      const slicedProducts = this.products.slice(start, end)

      this.components.cardsList.update(slicedProducts)
    })
  }
}















