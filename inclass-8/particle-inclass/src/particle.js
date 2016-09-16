const random = (min=0, max=800) =>
    Math.random() * (max - min) + min

// default values
const particle = ({
    mass=random(5, 30),
    position=[random(), random()],
    velocity=[random(-0.1, 0.1), random(-0.1, 0.1)],
    acceleration=[0, 0]
}) => {
    return {acceleration, velocity, position, mass}
}

const update = ({acceleration, velocity, position, mass}, delta, canvas) => {

	const [ax, ay] = acceleration;
	const [vx0, vy0] = velocity;
	const [x0, y0] = position;
	const m = mass;
	const a = acceleration;
	const dt = delta;

	const p = particle({
		mass: m,
		velocity: [(vx0 + ax * dt), (vy0 + ay * dt)],
		position: [wrap(x0, vx0, dt), wrap(y0, vy0, dt)],
		acceleration: a
	})

	return p;
}

// Helper function to check if the ball needs to wrap.
function wrap(pos, vel, dt) {
	if (pos < 0) {
		return (800 + pos - vel * dt);
	} else if (pos > 800) {
		return (pos - 800 + vel * dt);
	} else {
		return pos + vel * dt;
	}
}

export default particle

export { update }
