
export default function setPositionSlider(value, vectorPosition, slider) {

 let position=localStorage.getItem("indexGames");
 let lenght=vectorPosition.length-2;
    if (value == 1) {
        //right
        if (position <= lenght) {
            position++;
        }
    }
    if (value == -1) {

        //left
        if (position > 0) {
            position--;
        }
    }
    localStorage.setItem("indexGames",position);
    slider.style.transform = "translate(" + vectorPosition[position] + "%)";
}

