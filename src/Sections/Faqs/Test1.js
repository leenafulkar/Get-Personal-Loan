import React, { useContext, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
// import accordionData from './accordionData.json';
import { HomeContext } from '../../App';


const Test1 = () => {
  const data = useContext(HomeContext);
const faqSectionContent = data.customization.faq.content;

  // const [defaultActiveKey, setDefaultActiveKey] = useState(data.customization.faq[1].id);

  return (
    <Accordion defaultActiveKey={0}>
      {faqSectionContent.faq.map(item => (
        <Accordion.Item key={item.id} eventKey={item.id}>
          <Accordion.Header>{item.qus}</Accordion.Header>
          <Accordion.Body dangerouslySetInnerHTML={{ __html: item.ans }}></Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default Test1;