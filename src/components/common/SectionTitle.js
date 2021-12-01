import React from 'react'
import Spacer from './Spacer'

const SectionTitle = ( {title, description} ) => {
    
    return (
        <div className="section-title">
            <h2>{title}</h2>
            {description && <h5>{description}</h5>}
            
            <span></span>
            <Spacer size={50}/>
        </div>
    )
}

export default SectionTitle
