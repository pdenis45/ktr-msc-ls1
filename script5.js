$(document).ready(function(){

    var $Etat_civil=$("#Etat_civil"),
        $M=$("#Etat_civil option:eq(0)"),
        $F=$("#Etat_civil option:eq(1)"),
        $Nom=$("#Nom"),
        $Prenom=$("#Prénom"),
        $Nom_complet=$("#Nom_complet"),
        $Date_de_naissance=$("#Date_de_naissance"),
        $Niveau_en_javascript=$(".slider"),
        $Couleur_preferee=$("#Couleur_preferee"),
        $mdp=$("#Mot_de_passe"),
        $confirmation=$("#Mot_de_passe_encore"),
        $Afficher_mdp=$("#Afficher_mot_de_passe"),
        $Description=$("#Description"),
        $reset=$("#Reset"),
        $send=$("#Envoyer"),
        $Personne=$(".personne"),
        $champ=$(".champ");

$Personne.keyup(function(){
  if($Etat_civil && $Nom.val()!="" && $Prenom.val()!="")
    $Nom_complet.val($Etat_civil.val() +" "+$Nom.val()+" "+$Prenom.val());
  })

$Afficher_mdp.click(function(){
  if($Afficher_mdp.is(':checked')){
    $mdp.attr("type","text");
    $confirmation.attr("type","text");
  }
})

$send.prop('disabled', true);

$champ.keyup(function(){
  if($Nom.val() !="" && $Prenom.val() !="" && $Nom_complet.val() !="" &&
      $Date_de_naissance.val() !="" && $mdp.val() !="" && $confirmation.val() !="" &&
      $Description.val() !="")

$send.prop('disabled', false);
})

$("label").css({
  color :'red'
});

// function champ_vide(){
//   var i=0;
//   for(i=0;i<11;i++){
//     if($champ.eq(i).val()!="")
//         $("label").eq(i).css({
//           color:'blue'
//         });
//       }
// }
// setInterval(champ_vide(),1000);

$confirmation.keyup(function(){
    if($(this).val() != $mdp.val()){ // si la confirmation est différente du mot de passe
        $(this).css({ // on rend le champ rouge
	    borderColor : 'red',
	    color : 'red'
        });
    }
    else{
	$(this).css({ // si tout est bon, on le rend vert
	    borderColor : 'green',
	    color : 'green'
	});
    }
});


});
