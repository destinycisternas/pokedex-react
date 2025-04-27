import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col, Card, CardBody, CardText, Badge, Progress } from 'reactstrap'
import axios from 'axios'
import PokeTarjeta from '../Components/PokeTarjeta'

const Detalle = () => {
  const {id} = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [especie, setEspecie] = useState([]);
  const [habitat, setHabitat] = useState('Desconocido');
  const [descripcion, setDescripcion] = useState([]);
  const [image, setImage] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');
  useEffect(() => {
    getPokemon()
  }, []);
  const getPokemon = async () => {
    const liga = 'https://pokeapi.co/api/v2/pokemon/' + id;
    axios.get(liga).then((response) => {
      const respuesta = response.data;
      setPokemon(respuesta);
      if (respuesta.sprites.other.dream_world.front_default != null) {
        setImage(respuesta.sprites.other.dream_world.front_default);
      } else {
        setImage(respuesta.sprites.other['official-artwork'].front_default);
      }
      setCardClass('')
      setLoadClass('d-none')
    })
  }
  const getEspecie = async(esp)=> {
    const liga = 'https://pokeapi.co/api/v2/pokemon-species/' +esp;
    axios.get(liga).then((response) => {
      const respuesta = response.data;
      setEspecie(respuesta);
      if (respuesta.habitat != null ) {
        gethabitat(respuesta.habitat.url)
      }
    })
  }
  const gethabitat = async(habitat)=> {}

  const getDescripcion = async(Descripcion)=> {}

  return (
    <Container className='bg-danger mt-3'>
      <Row>
        <Col>
          <Card className='shadow mt-3 mb-3'>
            <CardBody className='mt-3'>
              <Row >
                <Col className='text-end'>
                  <Link to='/' className='btn btn-warning'>
                    <i className='fa-solid fa-home'></i>Inicio
                  </Link>
                </Col>
              </Row>
              <Row className={loadClass}>
                <Col md='12'>
                  <img src='/img/primeroLOADING.gif' className='w-100'></img>
                </Col>
              </Row>
              <Row className={cardClass}>
                <Col md='6'>
                  <CardText className='h1 text-capitalize'>{pokemon.name}</CardText>
                  <CardText className='fs-3 '>{descripcion}</CardText>
                  <CardText className='fs-5 '>
                    Altura: <b>{(pokemon.height)/10} m </b>
                    Peso: <b>{(pokemon.weight)/10} kg </b>
                  </CardText>
                  <CardText className='fs-5 '>Tipo</CardText>
                  
                </Col>
                <Col md='6'></Col>
              </Row>

            </CardBody>
          </Card>
        </Col>
      </Row>

    </Container>
  )
}

export default Detalle
