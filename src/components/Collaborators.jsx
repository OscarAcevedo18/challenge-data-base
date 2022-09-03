import React from "react";
import { useState } from "react";
import { baseColaboradores } from "../Array";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';
import { nanoid } from "nanoid"; 

const Collaborators = () => {
  const [namePartner, setNamePartners] = useState("");
  const [mailPartner, setMailPartners] = useState("");
  const [listPartners, setListPartners] = useState(baseColaboradores);
  const [filterPartner, setFilterPartner] = useState("");


  const sendForm = (e) => {
    e.preventDefault();
    if (namePartner === ''|| mailPartner === '') {
      Swal.fire({
        title: 'Cuidado!',
        text: 'Debes ingresar tus datos',
        imageUrl: 'https://i.pinimg.com/originals/e4/c6/f0/e4c6f0fa2b55806253bcc1df6737c6d7.gif',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Custom image',
      })
      return
    }
    
    setListPartners([
      ...listPartners,
      {id: nanoid(),  nombre: namePartner, correo: mailPartner }
    ]);

    setNamePartners("");
    setMailPartners("");
  };

  const editPartner = (partner) => {
    const newPartner = [...listPartners];
    const index = newPartner.findIndex((el) => el.nombre === partner.nombre);
    newPartner[index].completada = true;
    setListPartners(newPartner);
  };
  const deletePartner = (partner) => {
    const listFilter = listPartners.filter(
      (el) => el.nombre !== partner.nombre
    );
    setListPartners(listFilter);
  };
  return (
    <div >
      <div className="container-fluid bar">
        <h3>Buscador de Colaboradores</h3>
        <input
          className="search"
          onChange={(e) => setFilterPartner(e.target.value)}
          type="text"
          placeholder="Busca un Colaborador"
        ></input>
      </div>

      <form className="container" onSubmit={sendForm}>
          <Row>
            <Col>
              <Form.Control
                value={namePartner}
                placeholder="Ingrese el nombre del Colaborador"
                onChange={(e)=> setNamePartners(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Control
                type="email"
                value={mailPartner}
                placeholder="Ingrese el correo del Colaborador"
                onChange={(e)=> setMailPartners(e.target.value)}
              />
            </Col>
          </Row>
        <Button type="submit" className="btn" variant="danger">
          Agregar Colaborador
        </Button>
      </form>

      <hr />

      <h2 className="text-center">Listado de Colaboradores</h2>

      <ul className="list-group container mb-5">
        {listPartners
          .filter((partner) =>
            partner.nombre.toLowerCase().includes(filterPartner)
          )
          .map((partner) => (
            
            <li className="list-group-item opacity-75 text-dark"
              key={partner.id}
              style={
                partner.completada === true
                  ? { textDecoration: "line-through" }
                  : {}
              }
            >
              {partner.nombre} {partner.correo} {partner.completada}
              
                <button className="btn btn-success float-end hover-focus" onClick={() => editPartner(partner)}>
                  {" "}
                  Completar{" "}
                </button>
              <button className="btn btn-danger float-end hover-focus " onClick={() => deletePartner(partner)}>
                {" "}
                Borrar{" "}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Collaborators;
