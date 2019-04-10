import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
    render () {
        return (
            <div className="container-fluid" id="home">
                <h2>Welcome to the site for gemstones!</h2>
                <h3>The information below is important for what our application us!</h3>
                <section className="inner-home">
                    <article className="home-gems">
                        <img src={ require('../../../image/powerpoints.jpg')} id="left" alt="gallery"/>
                        <h3 className="h3">Info for Gems</h3>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;
                                A gems or gemstone is a piece of mineral crystal which, in cut and polished form, is used to make jewelry or other adomments.
                            However, certain rocks and occasionally organic materials that are not minerals are also used for jewelry and are therefore often considered to be gemstone as well.
                            Most gems are hard, but some soft minerals are used in jewelry because of their luster or other physical properties that have aesthetic value.
                            Physical characteristics that make a colored stone valuable are color, clarity to a lesser extent, cut, unusual optical phenomena within the stone such as color zoning(the uneven distribution of coloring within a gem) and asteria (star effects).
                            Aside from the diamond, the ruby, sapphire, emerald and opal have also been considered to be precious.
                            Many gemstones are used in even the most expensive jewelry, depending on the brand name of the designer, fashion trends, market supply, treatments, etc.
                            Nevertheless, diamonds, rubies, saphires, and emeralds still have a reputation that exceeds those of other gemstone.
                        </p>
                    </article>
                    <article className="home-jewels">
                        <img src={ require('../../../image/jewels.jpg')} id="home-jewels" alt="gallery"/>
                        <h3>Info for Jewelry</h3>
                        <p>    &nbsp;&nbsp;&nbsp;&nbsp;
                                Jewelry consists of small decorative items worn for personal adornment, such as brooches, rings, necklaces, earrings, pendants, bracelets, and cufflinks. 
                            Jewellery may be attached to the body or the clothes. For many centuries metal, often combined with gemstones, has been the normal material for jewellery.
                            The basic forms of jewellery vary between cultures but are often extremely long-lived, in European cultures the most common forms of jewellery listed above have persisted since ancient times, 
                            while other forms such as adornments for the nose or ankle, important in other cultures, are much less common.
                            Jewellery may be made from a wide range of materials. Gemstones and similar materials such as amber and coral, precious metals, beads, and shells have been widely used, and enamel has often been important.
                            In most cultures jewellery can be understood as a status symbol, for its material properties, its patterns, or for meaningful symbols. Jewellery has been made to adorn nearly every body part, from hairpins to toe rings. 
                        </p>
                    </article>
                </section>
            </div>
        );
    }
}

export default Home;