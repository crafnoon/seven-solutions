import './App.css';
import React, { useState } from 'react';

const list = [
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



const  App = () => {
  const [mainList, setMainList] = useState(list)
  const [fruitList, setFruitList] = useState([])
  const [vegetableList, setVegetableList] = useState([])
  const [tempList, setTempList] = useState([])
  const mainListOnclick = (selectItem) => {
    setTempList(prev => [...prev ,selectItem])
    setMainList(mainList.filter(item => item.name !== selectItem.name))

    if (selectItem.type === 'Fruit') {
      fruitList.push(selectItem)
    } else if (selectItem.type === 'Vegetable') {
      vegetableList.push(selectItem)
    }
  }

  const wait = (time) => new Promise((resolve, reject) => setTimeout(resolve, time))

  const filterOut = (list, selectForPop) => {
    return list.filter(item => item.name !== selectForPop.name)
  }



  const sublistOnclick = async(selectItem, event) => {
    event.stopPropagation()

    // clear temp for click right column
    setTempList(filterOut(tempList, selectItem))

    if(selectItem.type === 'Fruit') {
      const newFriutList = filterOut(fruitList, selectItem)

      if (fruitList.length === 1) {
        //wait 5 sec
        wait(5000)
        setFruitList(newFriutList)
        // set mainlist 
        setMainList(prev => [...prev, selectItem])
          
        
      } else {
        setFruitList(newFriutList)
        // set mainlist 
      }
      

    } else if (selectItem.type === 'Vegetable') {

        const newVegetable = filterOut(vegetableList, selectItem)
    
        if (vegetableList.length === 1) {
          // wait 5 sec
          await wait(5000)
          setVegetableList(newVegetable)

        // set mainlist 
        setMainList(prev => [...prev, selectItem])
        
      } else {
        setVegetableList(newVegetable)
        // set mainlist 
        setMainList(prev => [...prev, selectItem])
      }
    }


 
  
  }


  const rightColumnOnClick = (event) => {

    if (tempList.length === 0 ) return
    
    if(tempList[0].type === 'Fruit') {
      const newFriutList = filterOut(fruitList, tempList[0])
      setFruitList(newFriutList)

    } else {
      // if type = Vegetables
      console.log('tempList[0] Vegetable', tempList[0] )

      const newVegetable = filterOut(vegetableList, tempList[0])
      setVegetableList(newVegetable)
    }
    const newTemplist = filterOut(tempList, tempList[0])
    setTempList(newTemplist)
    mainList.push(tempList[0])
  }
  return (
    <div className="App">
      <div className='main-list'>
        {mainList.map(item => 
        <div key={item.name} className='item' onClick={(e) =>  mainListOnclick(item, e)}>
          {item.name}
        </div>
        )}
      </div>
      <div className='fruit-list'>
          <div className='title'>
            Fruit
          </div>
          <div className='list'>
            {fruitList.map(item =>  
                <div key={item.name} className='item sub-list-itme' onClick={(e) => tempList.find(tempItem =>{ console.log(tempItem.name === item.name) 
                  return tempItem.name === item.name}  ) && sublistOnclick(item, e)}>
                  {item.name}
                </div>)}
          </div>
      </div>
      <div className='vegetable-list' onClick={rightColumnOnClick}>
           <div className='title' >
            Vegetable
          </div>
          <div className='list'>
              {vegetableList.map(item => 
                <div key={item.name} className='item sub-list-itme' onClick={(e) => tempList.find(tempItem =>{ console.log(tempItem.name === item.name) 
                  return tempItem.name === item.name}  ) && sublistOnclick(item, e)}>
                    {item.name}
                </div>)}
          </div>
      </div>
    </div>
  );

}


export default App;
