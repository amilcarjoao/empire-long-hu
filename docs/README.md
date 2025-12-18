# Newsletter Online Version

Ce dossier contient les versions en ligne des newsletters envoyées via Mailjet.

## 📖 Documentation Complète

Pour un guide détaillé de configuration et d'utilisation, consultez [SETUP-GUIDE.md](SETUP-GUIDE.md).

## Comment utiliser ce système

### Configuration GitHub Pages

1. Allez dans les paramètres de votre dépôt GitHub
2. Cliquez sur "Pages" dans le menu latéral
3. Dans "Source", sélectionnez "Deploy from a branch"
4. Sélectionnez la branche `main` (ou la branche principale)
5. Sélectionnez le dossier `/docs`
6. Cliquez sur "Save"

Votre site sera disponible à l'adresse : `https://amilcarjoao.github.io/empire-long-hu/`

### Configuration Mailjet

Dans vos templates d'emails Mailjet, ajoutez un lien "Voir en ligne" en haut de votre newsletter :

```html
<p style="text-align: center; font-size: 12px;">
    <a href="https://amilcarjoao.github.io/empire-long-hu/newsletters/[NOM-DE-LA-NEWSLETTER].html">
        Voir cette newsletter dans votre navigateur
    </a>
</p>
```

Ou utilisez la variable Mailjet si vous utilisez leur système d'hébergement :

```html
<p style="text-align: center; font-size: 12px;">
    <a href="[[PERMALINK]]">
        Voir cette newsletter dans votre navigateur
    </a>
</p>
```

### Ajouter une nouvelle newsletter

1. Créez un nouveau fichier HTML dans le dossier `docs/newsletters/`
2. Nommez-le de façon descriptive (ex: `2024-12-newsletter.html`)
3. Copiez la structure du fichier `sample.html`
4. Ajoutez votre contenu
5. Mettez à jour `docs/index.html` pour ajouter un lien vers votre nouvelle newsletter
6. Commitez et pushez vos changements

### Structure des fichiers

- `docs/index.html` : Page d'accueil listant toutes les newsletters
- `docs/newsletters/` : Dossier contenant les newsletters individuelles
- `docs/newsletters/sample.html` : Exemple de newsletter

### Personnalisation

Vous pouvez personnaliser les couleurs et le style en modifiant les sections CSS dans les fichiers HTML.

### Dépannage

Si le lien ne fonctionne pas dans Mailjet :

1. Vérifiez que GitHub Pages est bien activé
2. Vérifiez que l'URL est correcte : `https://amilcarjoao.github.io/empire-long-hu/`
3. Attendez quelques minutes après l'activation de GitHub Pages
4. Assurez-vous que le fichier HTML existe bien dans le dossier docs/newsletters/
5. Vérifiez que le lien dans votre template Mailjet pointe vers la bonne URL
