const gravity = 9.8;
const ρ0 = 1.225;
const cD = 0.9;
let parachute_area;
let person_mass;
let velocity_x = 0;
let velocity_y = 0;
let free_velocity_y = 0;
let parachute_mass;
let rope_counts;
let rope_length;
let rope_area;
let side_factor = 1.2;
let x = 0;
let free_acc_y = 0;

person_mass = parseFloat(prompt("Enter the person's mass in kg"));
console.log("Your person's mass: " + person_mass + " kg");

parachute_mass = parseFloat(prompt("Enter the parachute_mass in kg"));
console.log("Your parachute mass: " + parachute_mass + " kg");

let mass = person_mass + parachute_mass;
console.log("Total mass: " + mass + " kg");

weight_force = mass * gravity;
console.log("the Weight force is " + mass + " * 9.8 = " + weight_force + " N");

wind_velocity = parseFloat(prompt("Enter the wind_velocity in m/s"));
console.log("Wind velocity: " + wind_velocity + " m/s");

rope_counts = parseFloat(prompt("Enter the number of ropes"));
console.log("the number of ropes: " + rope_counts);

rope_length = parseFloat(prompt("Enter the length of rope"));
console.log("the length of rope: " + rope_length);

rope_area = parseFloat(prompt("Enter the rope_area"));
rope_area = rope_area / 1000000;
console.log("Your rope_area: " + rope_area);

parachute_area = parseFloat(prompt("Enter the parachute area"));
console.log("the parachute area: " + parachute_area + " m²");

let height = parseFloat(prompt("Enter the height"));

let parachute_jump = parseFloat(prompt("Enter where the parachute open"));
console.log('parachute opens in ' + parachute_jump);

let rope_force = weight_force / rope_counts;
console.log('rope_force = ' + rope_force);

let length_range = (rope_force * rope_length) / (rope_area * (3.5 * 1000000000)); // new_rope_length =0.035
console.log('length_range = ' + length_range);

let v = 0;
let all = (rope_length + length_range);
all = parseFloat(all.toFixed(2));

console.log('all ' + all);

let current_rope_now;

while (height > 0) {

    if (height <= parachute_jump) {
        console.log('height =  ' + height);

        air_density = ρ0 * Math.exp(-height / 8000);

        console.log("air_density: " + air_density + " kg/m³");

        let air_resistance_force = 0.5 * velocity_y * velocity_y * air_density * parachute_area * cD;
        console.log('air_resistance_force = ' + air_resistance_force);

        v = v + (0.0001 * (height - (height - velocity_y)));
        console.log('  (height -(height - velocity_y))= ' + (height - (height - velocity_y)));

        console.log('v = ' + v);
        current_rope_now = rope_length + v;
        console.log('current rope is  ' + current_rope_now + ' on ' + height + 'm')
        parseFloat(current_rope_now.toFixed(2));
        console.log('current_rope_now.toFixed(5) is ' + current_rope_now.toFixed(2) + ' on ' + height + 'm')

        if (current_rope_now.toFixed(2) == all) {

            console.log('current rope is cut on ' + height);

            parachute_area = 0;
            parachute_mass = 0;

        }

        let wind_force = side_factor * (wind_velocity - velocity_x);
        let acc_x = wind_force / mass;
        console.log('acc_x in this ' + height + ' = ' + acc_x);

        velocity_x += acc_x;
        console.log('velocity_x in this ' + height + ' = ' + velocity_x);

        x += velocity_x
        console.log('x in this ' + height + ' = ' + x);

        let acc_y = (weight_force - air_resistance_force) / mass;
        console.log('a_y in this ' + height + ' = ' + acc_y);
        velocity_y += acc_y;
        console.log('velocity_y in this ' + height + ' = ' + velocity_y);
        height -= velocity_y;
    }
    else if (parachute_jump < height) {
        console.log(' free ');
        free_acc_y = gravity;
        free_velocity_y += free_acc_y;
        height -= free_velocity_y;
        console.log('free fall with a =' + free_acc_y + 'and velocity_y =' + free_velocity_y + 'height' + height);
    }
}