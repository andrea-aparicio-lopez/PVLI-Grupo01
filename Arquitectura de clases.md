# Arquitectura de clases

## SISTEMAS PRINCIPALES

	Game
Contiene los metodos necesarios para empezar y acabar el turno, ademas de la lista de las entidades.

	Board
La clase que contiene el tablero, con la matriz de __entidades__ y la de __obstaculos atravesables__

## CARTAS
	Card
Cartas que se van a usar en el juego.
Cuentan con toda la informacion de esa carta (nombre, delay y tipo de carta) ademas de su `Action`. 

Al usarse la carta se reproduce la logica que hay dentro de la variable `Action`

	Deck
Cuenta con el __array completo de cartas__, y el __array de las cartas actuales__.

	Action
Es la logica que tiene cada carta. Se le pasa un `Target`, que se usa en la logica de la carta.
Las acciones se pueden servir de clases primitivas para realizarse.

_P.ej, primitiva de ataque, primitiva de movimiento... 
que se usan para realizar una accion mas compleja._

	Target
La "hitbox" de la accion, representado en matriz. 

- `TargetType`: es el tipo de hitbox que es. 

- `TargetShape`: la forma que tiene el Target, de tipo `Shape`


- `TargetRange`: es la distancia a la que se quiere "instanciar" `TargetShape`

```
Shape
```
Una forma, representada en una matriz de bool.

`AnchorPoint`: En que parte de la matriz de se encuentra el origen. Esto se usa para "instanciar" la forma en el tablero.

## OBJETOS
Todos los `Object` cuentan con una posicion _x_ e _y_.

	Entity extends Object
Entidad viva en el tablero de juego. Tienen su propia Health (`num`), DamageMultiplier (`num`) y 
EffectList (`Effect[]`).

Cuenta con metodos para dañar y curar a la entidad.

Extienden de Entity los `PJ` y los `Enemy`.


	Obstacle extends Object
Falta

	PJ extends Entity
Falta

	Enemy extents Entity
Falta