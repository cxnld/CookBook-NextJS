import Link from 'next/link'
import Card from 'react-bootstrap/Card'
import styles from '../../styles/Card.module.css'

const GridElement = ({ recipe }) => {
    return (
        <Link href={`/recipes/${recipe._id}`} passHref>
            <Card className={styles.card}>
                <Card.Img className={styles.image} variant="top" src={recipe.image} />
                
                <Card.Body className={styles.body}>
                    <Card.Title>
                        { recipe.title }
                    </Card.Title>

                    <Card.Text className={styles.overview}>
                        { recipe.description }
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default GridElement