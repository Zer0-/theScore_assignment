{ pkgs ? import <nixpkgs> {} }:

with pkgs;
mkShell {
  buildInputs = [ yarn nodejs python3 ];
  shellHook = ''
    yarn install
    yarn build
    cd build
    python3 -m http.server 8000
  '';
}
