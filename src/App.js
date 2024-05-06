import './App.css';
import React, { useRef, useState } from 'react';
import {SubList} from './components/sublist'


const LIST = [
  {
    type: 'Fruit',
    name: 'Apple',
  },
  {
    type: 'Vegetable',
    name: 'Broccoli',
  },
  {
    type: 'Vegetable',
    name: 'Mushroom',
  },
  {
    type: 'Fruit',
    name: 'Banana',
  },
  {
    type: 'Vegetable',
    name: 'Tomato',
  },
  {
    type: 'Fruit',
    name: 'Orange',
  },
  {
    type: 'Fruit',
    name: 'Mango',
  },
  {
    type: 'Fruit',
    name: 'Pineapple',
  },
  {
    type: 'Vegetable',
    name: 'Cucumber',
  },
  {
    type: 'Fruit',
    name: 'Watermelon',
  },
  {
    type: 'Vegetable',
    name: 'Carrot',
  },
  ]

const DELAY_TIMEOUT_MS = 5000

//* set goup list by type
const INIT_LIST_GROUPS = LIST.reduce((acc, current) => {
  if (!acc[current.type]) {
    acc[current.type] = []
  }
  return acc
},{})

const  App = () => {
  const [mainList, setMainList] = useState(LIST)
  const [typeGroup, setTypeGroup] = useState(INIT_LIST_GROUPS)
  const timeoutDelay = useRef(new Map())

  const mainListOnclick = (selectItemIndex) => {
    const selectItem = mainList[selectItemIndex]
    //* Remove Item from main list
    setMainList(filterOut(mainList, selectItem))

    //* Add item to sub list
    setTypeGroup((prev) => {
      return {
        ...prev,
        [selectItem.type]: [...prev[selectItem.type], selectItem]
      }
    })
    
    const time = setTimeout(()=> {
      deleteItem(selectItem)
    },DELAY_TIMEOUT_MS)

    timeoutDelay.current.set(selectItem.name, time)
  }

  const filterOut = (list, selectForPop) => {
    return list.filter(item => item.name !== selectForPop.name)
  }

  const deleteItem = (selectItem) => {
    //* add item to main list
    setMainList(prev => [...prev, selectItem])
    setTypeGroup((prev) => {
      const newItems = prev[selectItem.type].filter(item => item.name !== selectItem.name)
      return {
        ...prev,
        [selectItem.type]: newItems
      }
    })
  }

  const handleDeleteItem = (item) => {
    //* Clear timeout
    const timeOut = timeoutDelay.current.get(item.name)
    if (timeOut) {
      clearTimeout(timeOut)
      timeoutDelay.current.delete(item.name)
    }
    //* Call deleteItem function
    deleteItem(item)
  }
  
  return (
    <div className="App">
      <div className='main-list'>
        {mainList.map((item, index) => 
        <div key={item.name} className='item' onClick={(e) =>  mainListOnclick(index)}>
          {item.name}
        </div>
        )}
      </div>
      {Object.keys(INIT_LIST_GROUPS).map((type) => {
        return <SubList title={type} items={typeGroup[type]} handleDeleteItem={handleDeleteItem} />
      })}
    </div>
  );

}


export default App;
