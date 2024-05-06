
export const SubList = (props) => {
    return <div className='list'>
      <div className='title'>
        {props.title}
      </div>
      <div className='list'>
        {props.items.map((item, index) =>
          <div key={item.index} className='item sub-list-item' onClick={() => props.handleDeleteItem(item, index)}>
            {item.name}
          </div>)}
      </div>
    </div>
  }