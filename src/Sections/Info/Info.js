import React, { useContext } from 'react'
import "./Info.css"
import { Container } from 'react-bootstrap'
import { HomeContext } from '../../App';
const Info = () => {
  const data = useContext(HomeContext);

  const headerSectionContent = data.customization.infoSection.content;
  const headerSectionSty = data.customization.infoSection.style;

  const InfoTitleColor = {
   color: headerSectionSty.infoTitleColor
  }
  const InfoTextColor = {
    color: headerSectionSty.infoTextColor
   }
   const InfoBlockBg = {
    color: headerSectionSty.infoblockBg
   }

  console.log("INFO ------------------------>>>>>>>>>",headerSectionContent);

  return (
  <Container fluid className='infibg' style={InfoBlockBg}> 
      <div className='container'>
    <div className='row'>
    {headerSectionContent.map((infoData,index) =>
      <div className='col-lg-3 col-md-3 col-sm-6 col-6' key={index}>
        <div >
           <h1 className='info_number' style={InfoTitleColor}>{infoData.infoTitle}</h1>
          <p className='info_para' style={InfoTextColor}>{infoData.infoText}</p>
        </div>
      
      </div>
      )}

    </div>

    </div>
  </Container>
  )
}

export default Info