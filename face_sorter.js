let s_face, c_face, h_face;
let s_sound, c_sound, h_sound;
let current_face, current_sound;
let tf_grid;
let sw , sh;
let half_image;
let mX,mY;
let d;
//Original Image Pixel Array
let or_arr = [];
//Picture Array
let pic_arr = [];
//Sound Array
let snd_arr = [];
//Amount of pixels updated
let update_px;
let done_unscram = true;
let start_button, scram_button;
let vic_arr = ["YEAAAA ITS SUSAN!!!", "ITS HIM COLTON", "HAMBOOOOOONE"]
let victory_font = "";
let s_unscram = false;

function preload(){
	s_face = loadImage("f_scram/face1.jpg");
	c_face = loadImage("f_scram/face2.jpg");
	h_face = loadImage("f_scram/face3.jpg");
	s_sound = loadSound("f_scram/its_susan.mp3");
	c_sound = loadSound("f_scram/its_colton.mp3");
	h_sound = loadSound("f_scram/its_hambone.mp3");

}

function setup(){
	pic_arr.push(s_face);
	pic_arr.push(c_face);
	pic_arr.push(h_face);
	snd_arr.push(s_sound);
	snd_arr.push(c_sound);
	snd_arr.push(h_sound);
	current_face = s_face;
	current_sound = s_sound;
	sw = current_face.width / 10;
	sh = current_face.height / 10;
	createCanvas(sw,sh + 100);

	start_button = createButton('Unscramble');
	start_button.position(40, sh + 100);
	start_button.mousePressed(unscramStart)

	scram_button = createButton('Scramble');
	scram_button.position(180, sh + 100);
	scram_button.mousePressed(pixelScramble);
	d = pixelDensity();
	pixelScramble();
	update_px = 0;
}

function draw(){
	if(s_unscram){
		let div_im = int(half_image/50)
		loadPixels();
		for(let j = 0; j < div_im; j++){
			pixels[update_px + j] = or_arr[update_px + j];
		}
		update_px += div_im;
		updatePixels();

		if(update_px >= half_image){
			done_unscram = true;
			update_px = 0;
			textSize(15)
			stroke(1)
			fill(0)
			text(victory_font,30,sh+80)
			current_sound.play();
			s_unscram = false;
		}
	}
}

function pixelScramble(){
	if(done_unscram){
		current_face = changeImage();
		image(current_face,0,0, sw,sh);
		stroke(255)
		fill(255)
		rect(0,sh+50,500,100)
		let d = pixelDensity();
		half_image = int(8 * (sw * d) * ((sh) / 2 * d));
		loadPixels();
		for (let i = 0 ; i < half_image; i+= 4){
			let random_int = int(random(half_image));
			
			//Check for random int out of range & that it starts with red value
			if(random_int > half_image - 4){
				random_int = half_image - 4
			}
			else if (random_int % 4 != 0){
				while (random_int % 4 != 0){
					random_int--;
				}
			}

			//Old Pixel Value
			let or_r = pixels[i];
			let or_g = pixels[i+1];
			let or_b = pixels[i+2];
			let or_a = pixels[i+3];
			//Place in old array
			or_arr[i] = or_r;
			or_arr[i+1] = or_g;
			or_arr[i+2] = or_b
			or_arr[i+3] = or_a
			//Update pixel value using random one
			pixels[i] = pixels[random_int];
			pixels[i+1] = pixels[random_int+1];
			pixels[i+2] = pixels[random_int+2];
			pixels[i+3] = pixels[random_int+3];
		}
		updatePixels();
		done_unscram = false;
		update_px = 0;
	}
}

function changeImage(){
	let i = int(random(3));
	current_sound = snd_arr[i];
	victory_font = vic_arr[i];
	return(pic_arr[i]);
}

function unscramStart(){
	s_unscram = true;
}
