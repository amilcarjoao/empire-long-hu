# Guide de Configuration - Newsletter en Ligne

Ce guide explique comment configurer votre newsletter Mailjet pour utiliser la fonction "Voir en ligne" avec GitHub Pages.

## 🎯 Objectif

Permettre aux destinataires de votre newsletter de la consulter en ligne via un lien dans l'email, même si leur client email ne l'affiche pas correctement.

## 📋 Prérequis

- Un compte Mailjet actif
- Accès au dépôt GitHub `amilcarjoao/empire-long-hu`
- GitHub Pages activé sur le dépôt

## 🚀 Étape 1: Activer GitHub Pages

1. Allez sur [https://github.com/amilcarjoao/empire-long-hu/settings/pages](https://github.com/amilcarjoao/empire-long-hu/settings/pages)
2. Dans la section "Build and deployment" :
   - **Source**: Sélectionnez "Deploy from a branch"
   - **Branch**: Sélectionnez `main` et le dossier `/docs`
   - Cliquez sur **Save**
3. Attendez quelques minutes que GitHub Pages déploie votre site
4. Votre site sera accessible à : `https://amilcarjoao.github.io/empire-long-hu/`

## 📧 Étape 2: Configurer Mailjet

### Option A: Utiliser le template fourni

1. Dans Mailjet, créez un nouveau template d'email
2. Copiez le contenu du fichier `docs/mailjet-template-example.html`
3. Collez-le dans l'éditeur HTML de Mailjet
4. Personnalisez le contenu selon vos besoins
5. **Important**: Remplacez `[NOM-NEWSLETTER]` par le nom réel de votre fichier HTML

### Option B: Ajouter le lien à un template existant

Ajoutez ce code HTML en haut de votre template Mailjet existant :

```html
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
        <td align="center" style="padding: 20px 0 10px 0;">
            <p style="margin: 0; font-size: 12px; color: #666;">
                Problème d'affichage ? 
                <a href="https://amilcarjoao.github.io/empire-long-hu/newsletters/NOM-FICHIER.html" 
                   style="color: #667eea; text-decoration: none;">
                    Voir cette newsletter dans votre navigateur
                </a>
            </p>
        </td>
    </tr>
</table>
```

## 📝 Étape 3: Publier une nouvelle newsletter

### 3.1 Créer le fichier HTML

1. Copiez le fichier `docs/newsletters/sample.html`
2. Renommez-le avec une date ou un identifiant unique (ex: `2024-12-newsletter.html`)
3. Modifiez le contenu selon votre newsletter

### 3.2 Mettre à jour l'archive

Éditez le fichier `docs/index.html` et ajoutez votre newsletter à la liste :

```html
<li class="newsletter-item">
    <a href="newsletters/2024-12-newsletter.html" class="newsletter-link">
        Titre de votre newsletter
    </a>
    <span class="newsletter-date">Décembre 2024</span>
</li>
```

### 3.3 Publier les changements

```bash
git add docs/
git commit -m "Add newsletter for December 2024"
git push origin main
```

Le workflow GitHub Actions déploiera automatiquement votre nouvelle newsletter.

## 🔗 Étape 4: Envoyer la newsletter

1. Dans Mailjet, créez une nouvelle campagne
2. Utilisez votre template configuré
3. Dans le lien "Voir en ligne", assurez-vous que l'URL correspond exactement au fichier que vous avez créé :
   - `https://amilcarjoao.github.io/empire-long-hu/newsletters/2024-12-newsletter.html`
4. Testez la newsletter en vous l'envoyant d'abord
5. Cliquez sur le lien "Voir en ligne" pour vérifier qu'il fonctionne
6. Si tout fonctionne, envoyez la newsletter à votre liste

## 🧪 Tests

### Tester localement

```bash
cd docs
python3 -m http.server 8080
```

Puis ouvrez `http://localhost:8080` dans votre navigateur.

### Tester en production

Une fois GitHub Pages activé, testez les liens :
- Archive: `https://amilcarjoao.github.io/empire-long-hu/`
- Exemple: `https://amilcarjoao.github.io/empire-long-hu/newsletters/sample.html`

## ❓ Dépannage

### Le lien ne fonctionne pas

1. **Vérifiez que GitHub Pages est activé**
   - Allez dans Settings > Pages
   - Vérifiez que le déploiement est réussi

2. **Vérifiez l'URL**
   - L'URL doit être exactement : `https://amilcarjoao.github.io/empire-long-hu/newsletters/[nom-fichier].html`
   - Attention à la casse (majuscules/minuscules)
   - Vérifiez qu'il n'y a pas d'espaces dans le nom de fichier

3. **Vérifiez que le fichier existe**
   - Allez sur GitHub et vérifiez que le fichier est bien dans `docs/newsletters/`

4. **Attendez le déploiement**
   - GitHub Pages peut prendre 1-5 minutes pour déployer les changements
   - Vérifiez l'onglet "Actions" sur GitHub pour voir l'état du déploiement

### Le style ne s'affiche pas correctement

Les fichiers CSS sont intégrés directement dans le HTML, donc ils devraient toujours fonctionner. Si vous avez des problèmes :
- Vérifiez que les balises `<style>` sont bien présentes dans le fichier HTML
- Testez dans différents navigateurs

## 📚 Ressources

- [Documentation GitHub Pages](https://docs.github.com/fr/pages)
- [Documentation Mailjet](https://dev.mailjet.com/)
- [Archive des newsletters](https://amilcarjoao.github.io/empire-long-hu/)

## 💡 Conseils

1. **Nommage des fichiers**: Utilisez un format de date pour les newsletters (ex: `2024-12-newsletter.html`)
2. **Backup**: Gardez toujours une copie de vos newsletters dans le dépôt
3. **Test**: Testez toujours le lien avant d'envoyer la newsletter à toute votre liste
4. **Archive**: Mettez à jour régulièrement `index.html` pour que tous puissent accéder aux anciennes newsletters
