<?php require './header.php';?>

<div class="container py-5" >
   <div class="row">
      <div class="col-md-8 col-lg-6 mx-auto">
         <div id="first">
            <div class="myform form ">
                 <div class="logo mb-3">
                     <div class="col-md-12 text-center">
                        <h1 class="text-primary">Login</h1>
                     </div>
                  </div>
                  <form action="#" name="login">
                       <div class="form-group pb-2">
                          <label class="form-label" for="email">Email address</label>
                          <input type="email" name="email"  class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                       </div>
                       <div class="form-group pb-2">
                          <label class="form-label" for="password">Password</label>
                          <input type="password" name="password" id="password"  class="form-control" aria-describedby="passwordHelp" placeholder="Enter Password">
                       </div>
                       <div class="form-group">
                          <p class="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                       </div>
                       <div class="col-md-12 text-center ">
                          <button type="submit" class="btn btn-primary">Login</button>
                       </div>
                       <div class="col-md-12 ">
                           <div class="login-or">
                             <hr class="hr-or">                             
                           </div>
                       </div>
                       <div class="col-md-12 mb-3">
                           <p class="text-center">
                           <a href="#" class="text-dark"><i class="bi bi-google text-primary"></i> Signup using Google</a>
                          </p>
                       </div>
                       <div class="form-group">
                          <p class="text-center">Don't have account? <a href="signup.html" id="signup">Sign up here</a></p>
                       </div>
                  </form>
            </div>
         </div>        
      </div>
   </div>  
</div>   

<?php require './footer.php';?>