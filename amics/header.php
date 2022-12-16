<!DOCTYPE html>
<html lang="es">
<head>
    <title>ADAF</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--Import Google Icon Font-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <!--Import Awesome Icons Font-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
    <!--Import Bootstrap Icons Font-->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    <!-- CSS Bootstrap only, SASS & Custom  -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="./css/main.css">
    <link rel="stylesheet" type="text/css" href="./css/custom_style.css">
    <!-- JavaScript Bundle with Popper, JQuery & Custom -->     
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <script src="./js/functions.js" ></script> 
</head>
<body class="d-flex flex-column min-vh-100">
    <header>
        <nav class="navbar sticky-top navbar-expand-md navbar-light bg-primary">
            <div class="container-fluid ">
              <a class="navbar-brand" href="./index.php"><img src="./img/logo/logo_white.png" height="50px"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link text-white" href="./index.php" tabindex="-1" aria-disabled="false">Home</a>
                  </li>
                  <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle text-white" href="/pool.php" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Pool</a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><a class="dropdown-item" href="#">Generate Journey</a></li>                 
                    </ul>
                  </li> -->
                  <li class="nav-item">
                    <a class="nav-link text-white" href="./pool.php" tabindex="-1" aria-disabled="false">Pool</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-white" href="#" tabindex="-1" aria-disabled="false">Journey</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-white" href="#" tabindex="-1" aria-disabled="false">Contact</a>
                  </li>
                </ul>
                <form class="d-flex" action="./login.php">
                  <!-- <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"> -->
                  <button class="btn btn-outline-light" type="submit">Login</button>
                </form>
                 <!-- Un formulari de cerca és una altra manera no lineal
                  de navegar a través d'un lloc web. -->
                <!-- <form>
                  <input type="search" name="q" placeholder="Cerca..." />
                  <input type="submit" value="cerca" />
                </form> -->
              </div>
            </div>
        </nav>
    </header>
    <main class="h-100 d-inline-block">
