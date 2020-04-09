<template>
  <div>
    <h4>Arma 3</h4>
    <div class="form-group">
      <label for="exampleInputPassword1">Katalog instalacji</label><i class="fa fa-check" style="color: #0fa700;margin-left: 5px;"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="exampleInputPassword1" readonly value="C:\Program Files (x86)\Steam\steamapps\common\Arma 3">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button">Wybierz</button>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Plik wykonawczy</label><br />
      <div class="btn-group btn-group-toggle">
        <label class="btn btn-secondary active">
          <input type="radio" name="options" id="option1"> 32-bit
        </label>
        <label class="btn btn-secondary">
          <input type="radio" name="options" id="option2" checked> 64-bit
        </label>
      </div>
      <p><span style="color: #464646;font-size: 13px;">
        C:\Program Files (x86)\Steam\steamapps\common\Arma 3\</span>Arma3_x64.exe <i class="fa fa-check" style="color: #0fa700"></i>
      </p>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Katalog z modami</label><i class="fa fa-check" style="color: #0fa700;margin-left: 5px;"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="exampleInputPassword1" readonly value="C:\Program Files (x86)\Steam\steamapps\common\Arma 3">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button">Wybierz</button>
        </div>
      </div>
      <small class="form-text text-muted">Mody z tego folderu będą automatycznie dodawane do launchera. Do tego folderu będą również pobierane nowe mody.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Katalog z misjami edytora</label><i class="fa fa-check" style="color: #0fa700;margin-left: 5px;"></i>
      <div class="input-group">
        <input type="text" class="form-control" id="exampleInputPassword1" readonly value="C:\Users\szwedzik\Documents\Arma 3\missions">
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button">Wybierz</button>
        </div>
      </div>
      <small class="form-text text-muted">Folder z którego edytor otwiera i do którego zapisuje tworzone misje. Domyślnie "Dokumenty\Arma 3\missions"</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Paths',
  components: {}
}
</script>
