const sortResults = <T extends { price: string, name: string, drink: string, date: Date | null }>(text: string, data: T[]) => {
  if (text === 'Price - Highest') {
      return data.sort((a: T, b: T) => Number(b.price) - Number(a.price))
  } else if (text === 'Price - Lowest') {
      return data.sort((a: T, b: T) => Number(a.price) - Number(b.price))
  } else if (text === 'Alphabetical - Pub') {
    return data.sort((a: T, b: T) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  } else if (text === 'Alphabetical - Drink') {
    return data.sort((a: T, b: T) => {
      if (a.drink < b.drink) return -1
      if (a.drink > b.drink) return 1
      return 0
  })} else if (text === 'Newest') {
    let dataWithDates = data.filter((x: T) => x.date && new Date(x.date) instanceof Date)
    const restWithoutData = data.filter((x: T) => !x.date)
    dataWithDates.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    return [ ...dataWithDates, ...restWithoutData ]
  } else if (text === 'Hide Weatherspoons') {
    return data.filter((pub: T) => !pub.name.toLowerCase().includes('weatherspoon'))
  }
  return data
}
export default sortResults