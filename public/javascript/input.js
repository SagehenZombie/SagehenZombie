function initialize_input(dir,state) {
    $(document).keydown(function (e) {
        state = 1;
        switch (event.keyCode) {
            case 37:
                dir = 0;
                break;
            case 38:
                dir = 1;
                break;
            case 39:
                dir = 2;
                break;
            case 40:
                dir = 3;
                break;
        }
    })
}

