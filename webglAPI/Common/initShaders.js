
function initShaders( gl, vertexShaderId, fragmentShaderId )
{
    var vertShader;
    var fragmentShader;

    var vertElem = document.getElementById(vertexShaderId);

    var message = "";

    if ( !vertElem ) { 
        alert( "Unable to load vertex shader " + vertexShaderId);
        return -1;
    }
    else {
        vertShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertShader, vertElem.text);
        gl.compileShader(vertShader);

        if ( !gl.getShaderParameter(vertShader, gl.COMPILE_STATUS) ) {
            message = "Vertex shader failed to compile.  The error log is:" + "<pre>" + gl.getShaderInfoLog( vertShader ) + "</pre>";
            alert( message );
            return -1;
        }
    }

    var fragElem = document.getElementById(fragmentShaderId);

    if ( !fragElem ) { 
        alert( "Unable to load vertex shader " + fragmentShaderId );
        return -1;
    }
    else {
        fragmentShader = gl.createShader( gl.FRAGMENT_SHADER );
        gl.shaderSource( fragmentShader, fragElem.text );
        gl.compileShader( fragmentShader );

        if ( !gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS) ) {
            message = "Fragment shader failed to compile.  The error log is:" + "<pre>" + gl.getShaderInfoLog( fragmentShader ) + "</pre>";
            alert( message );
            return -1;
        }
    }

    var program = gl.createProgram();
    gl.attachShader( program, vertShader );
    gl.attachShader( program, fragmentShader );
    gl.linkProgram( program );
    
    if ( !gl.getProgramParameter(program, gl.LINK_STATUS) ) {
        message = "Shader program failed to link.  The error log is:" + "<pre>" + gl.getProgramInfoLog( program ) + "</pre>";
        alert( message);
        return -1;
    }

    return program;
}
