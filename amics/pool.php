<?php require './header.php';?>
<div class="d-flex">
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light min-vh-100" style="width: 280px;">
        <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"><span class="fs-4">Sidebar</span></a>
        <hr>
        <ul class="nav nav-pills flex-column">
        <li class="nav-item">
            <a href="#" class="nav-link active" aria-current="page">Journey Generator</a>
        </li>
        <!-- <li>
            <a href="#" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
            Dashboard
            </a>
        </li>
        <li>
            <a href="#" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#hom2"></use></svg>
            Orders
            </a>
        </li>
        <li>
            <a href="#" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
            Products
            </a>
        </li>
        <li>
            <a href="#" class="nav-link link-dark">
            <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
            Customers
            </a>
        </li> -->
        </ul>
        <hr>
        <!-- <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="" alt="" class="rounded-circle me-2" width="32" height="32">
            <strong>mdo</strong>
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
        </div> -->
    </div>
    <div class="container">
      <h4 class="text-primary">Teams</h4>
      <div id="showTeams"></div>
      
    </div>
 
</div>
<script type="module" src="./js/equips.js"></script>  
<?php require './footer.php';?>